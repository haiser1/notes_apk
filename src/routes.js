/* eslint-disable import/newline-after-import */
/* eslint-disable no-trailing-spaces */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable semi */
const { 
    addNoteHandler, 
    getAllNoteHandler, 
    getNoteByIdHandler, 
    editNoteByIdHandler,
    deleteNoteByIdHandler,
    } = require('./handler')
const routes = [
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler,
    },
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNoteHandler,
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNoteByIdHandler,
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNoteByIdHandler,
    },
]
module.exports = routes