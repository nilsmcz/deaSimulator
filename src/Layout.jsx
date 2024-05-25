import React from 'react';
import { AppShell, Burger, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import DeaScreen from './DeaScreen';

function Typ3Grammatik() {
    return <div>Typ 3 Grammatik Inhalt</div>;
}

function CYKAlgorithmus() {
    return <div>CYK Algorithmus Inhalt</div>;
}

export default function Layout() {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

    return (
        <Router>
            <AppShell
                padding="md"
                header={{ height: 60 }}
                navbar={{
                    width: 300,
                    breakpoint: 'sm',
                    collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
                }}
            >
                <AppShell.Header>
                    <Button onClick={toggleDesktop} visibleFrom="sm">
                        Toggle navbar
                    </Button>
                    <Button onClick={toggleMobile} hiddenFrom="sm">
                        Toggle navbar
                    </Button>
                </AppShell.Header>

                <AppShell.Navbar>
                    <AppShell.Section>
                        <Link to="/typ3-grammatik">Typ 3 Grammatik</Link>
                    </AppShell.Section>
                    <AppShell.Section>
                        <Link to="/cyk-algorithmus">CYK-Algorithmus</Link>
                    </AppShell.Section>
                </AppShell.Navbar>

                <AppShell.Main>
                    <Routes>
                        <Route path="/typ3-grammatik" element={<DeaScreen />} />
                        <Route path="/cyk-algorithmus" element={<CYKAlgorithmus />} />
                    </Routes>
                </AppShell.Main>
            </AppShell>
        </Router>
    );
}
