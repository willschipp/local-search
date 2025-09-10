from aiohttp import web
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import CharacterTextSplitter
import logging
from ollama import Client
import os
import tempfile
from werkzeug.utils import secure_filename

logger = logging.getLogger(__name__)

SERVER_PORT = os.getenv('SERVER_PORT',8000)

async def invoke(prompt, pdf_path, model="gemma3:1b"):
    # Start Ollama client
    client = Client()

    print(f" pdf path {pdf_path}")

    # Load PDF and extract text
    loader = PyPDFLoader(pdf_path)
    docs = loader.load()
    text_splitter = CharacterTextSplitter(chunk_size=2000, chunk_overlap=200)
    chunks = text_splitter.split_documents(docs)

    # Combine chunks for context or use a retriever for large PDFs
    context = " ".join(chunk.page_content for chunk in chunks)

    # Compose prompt with context and question
    full_prompt = f"Document context:\n{context}\n\nQuestion: {prompt}\n\nAnswer:"

    # Pass to Gemma3 model running in Ollama
    response = client.chat(
        model=model,
        messages=[
            {"role": "user", "content": full_prompt}
        ]
    )
    return response['message']['content']


async def upload_video(request: web.Request) -> web.Response:
    reader = await request.multipart()
    field = await reader.next()
    if not field or field.name != 'file':
        return web.Response(text='No file part', status=400)

    filename = field.filename
    if not filename:
        return web.Response(text="No selected file", status=400)

    prompt = ""

    # get prompt
    post_data = await request.post()
    prompt = post_data.get("question", "")
    if not prompt:
        return web.Response(text="Parameter 'question' is required.", status=400)    

    filename = secure_filename(filename)
    suffix = os.path.splitext(filename)[1]

    print(f"file name {filename}")

    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as temp_file:
        size = 0
        while True:
            chunk = await field.read_chunk()  # async chunk read
            if not chunk:
                break
            temp_file.write(chunk)
            size += len(chunk)
        temp_path = temp_file.name
    # save

    print(f"temp path {temp_path}")

    results = await invoke(prompt, temp_path)

    return web.json_response({'response': results})

# UX server
async def serve_index(request: web.Request) -> web.Response:
    return web.FileResponse('./ux/dist/index.html')

# UX support server
async def serve_static(request: web.Request) -> web.Response:
    path = request.match_info['path']
    return web.FileResponse(f'./ux/dist/{path}')

async def create_app():
    app = web.Application()
    # add the api routes
    app.router.add_post('/api/v1/search', upload_video)
    # ux
    app.router.add_get('/', serve_index)
    app.router.add_get('/{path:.*}', serve_static)    
    # return
    return app

if __name__ == '__main__':
    web.run_app(create_app(), host="0.0.0.0", port=SERVER_PORT)