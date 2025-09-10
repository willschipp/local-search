import { Section, SectionCard } from "@blueprintjs/core";

import Upload from "../form/Upload";

function Home() {
    return (
        <>
            <Section style={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
                <SectionCard>
                    <Upload/>
                </SectionCard>
            </Section>        
        </>
    );
}

export default Home