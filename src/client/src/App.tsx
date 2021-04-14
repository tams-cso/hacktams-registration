import React from 'react';
import './App.css';

class App extends React.Component<any,any> {
    constructor(props: any) {
        super(props);
        this.state = { id: null };
    }
    
    async componentDidMount() {
        const id = await fetch('/api/auth/client').then((data) => data.json());
        this.setState({ id });
    }

    render() {
        return <div className="app">hackTAMS Registration!</div>;
    }
}

export default App;
