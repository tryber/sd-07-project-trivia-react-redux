import React from 'react';
import { Link } from 'react-router-dom';

class TelaDeRanking extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <Link to='/'>
            <button type="button" data-testid="btn-go-home">
                Home
            </button>
            </Link>
        )
    }
}