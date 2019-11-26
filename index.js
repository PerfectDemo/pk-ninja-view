import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import ReactJson from 'react-json-view';

const root = document.getElementById('root');

function Hello() {
    const [ json, setJson ] = useState([]);
    const [ updatedJson, setUpdatedJson ] = useState(null);

    const getTree = () => {
        return fetch('http://public-ram-dev.gaoding.com/api/app/get_privileges?app_id=1')
            .then(res => res.json())
            .then(json => {
                const tree = JSON.parse(json.content);
                setJson(tree);
            });
    };

    const updateTree = (newValue) => {
        if(!newValue) return;

        fetch('http://public-ram-dev.gaoding.com/api/app/save_privileges', {
            method: 'POST',
            body: JSON.stringify({
                app_id: 1,
                content: JSON.stringify(newValue)
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(() => {
            return getTree();
        });
    }

    useEffect(() => {
        getTree();
    }, []);

    return (
        <div>
            <button onClick={() => updateTree(updatedJson)}>save</button>
            <ReactJson src={json} onEdit={(src) => setUpdatedJson(src.updated_src)}/>
        </div>
    )
}

ReactDom.render(<Hello />, root);