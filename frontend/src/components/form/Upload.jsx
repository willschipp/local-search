import { useState } from 'react';
import { ControlGroup, FileInput, InputGroup, Button, ProgressBar, Section, SectionCard } from "@blueprintjs/core";

function Upload({resultsHandler}) {

    const [question,setQuestion] = useState('');
    const [file,setFile] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [results,setResults] = useState('');

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            //have a file
            setFile(e.target.files[0]);//get the first one
            setProcessing(false);
        }
    }

    const handleSearch = async (e) => {
        e.preventDefault(); //stop the default reaction

        setProcessing(true);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('question', question);

        console.log(file);

        try {
            const response = await fetch('/api/v1/search', {
                method: 'POST',
                body: formData,
            });
                        
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setResults(data.response || '');
            if (resultsHandler) {
                resultsHandler(data.response);
            }
        } catch (error) {
            // Optionally handle error here
            log.error(error);
        } finally {
            setProcessing(false); // Hide progress bar
        }

    }

    return (
        <Section>
            <SectionCard>
                <ControlGroup vertical={true}>
                    <FileInput text={file ? file.name : "Choose file..."} onChange={handleFileChange}/>
                    <InputGroup value={question} onChange={(e) => setQuestion(e.target.value)} type="text"/>
                    <Button text="Search" onClick={handleSearch}/>
                    {processing && <ProgressBar />}
                </ControlGroup>
            </SectionCard>
        </Section>
    );
}

export default Upload