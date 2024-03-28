import React from 'react';
import ReactDom from 'react-dom';
import './xrender.jsx';
import schema from './schema.js';

console.log(schema);

function App () {
    return <form-render schema={JSON.stringify(schema)}/>;
}

ReactDom.createRoot(document.getElementById('devRoot')).render(<App/>);
