import { useState, useEffect } from 'react';
import { Section, SectionCard, Text } from "@blueprintjs/core";

import Upload from "../form/Upload";

function Home() {

    const [results, setResults] = useState('');

    const handleResults = (data) => {
        setResults(data);
    }

    useEffect(() => {
        // setResults("placeholder");
    },[]);

    return (
        <>
            <Section style={{ height: '100vh', display: 'grid', placeItems: 'center', gridTemplateRows: '30% 50%' }}>
                <SectionCard style={{ display: 'flex', height: '100%', width: '90%'}}>
                    <Upload resultsHandler={handleResults}/>
                </SectionCard>
                <SectionCard style={{ overflowY: 'auto', padding: '1rem', height: '100%', width: '90%'}}>
                    {results && <>
                        <Text style={{textAlign:'start'}}>{results}</Text>
                    </>}
                </SectionCard>
            </Section>        
        </>
    );
}

export default Home