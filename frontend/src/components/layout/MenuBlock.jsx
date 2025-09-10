
import { useNavigate } from 'react-router-dom';
import { EntityTitle, Section, SectionCard, Menu, MenuItem, MenuDivider } from "@blueprintjs/core";
import { SearchText } from "@blueprintjs/icons";
import { version } from '../../../package.json';

function MenuBlock() {

    const handleGoHome = () => {
        navigate('/');
    }

    return (
        <Section style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <SectionCard>
                <EntityTitle title="Local Agentic Search" icon={<SearchText/>}/>
            </SectionCard>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <SectionCard>
                    <Menu>
                        <MenuItem text="Home" onClick={handleGoHome}/>
                        {/* <MenuItem text="Search">
                            <MenuItem text="By Name" onClick={handleGoSearch}/>
                            <MenuItem text="By Tags" onClick={handleGoTags}/>
                            <MenuItem text="By Provider" onClick={handleGoProviders}/>
                        </MenuItem>
                        <MenuItem text="Agents">
                            <MenuItem text="Maintenance" onClick={handleGoAgentMaintenance}/>
                        </MenuItem> */}
                    </Menu>

                </SectionCard>
            </div>
            <SectionCard style={{ position: 'sticky', bottom: 0, zIndex: 1, background: 'inherit' }}>
                {version}
            </SectionCard>
        </Section>
    );
}
export default MenuBlock