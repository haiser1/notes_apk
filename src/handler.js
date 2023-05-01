/* eslint-disable consistent-return */
/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable padded-blocks */
/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable no-shadow */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable no-multiple-empty-lines */

// const { request } = require("http");
const { nanoid } = require("nanoid");
const notes = require("./notes");
const { request } = require("http");

// menambahkan note
const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload

    const id = nanoid(16)
    const createdAt = new Date().toISOString()
    const updatedAt = createdAt

    const newNote = {
        title, tags, body, id, createdAt, updatedAt,
    }

    notes.push(newNote)

    const isSuccess = notes.filter((note) => note.id === id).length > 0

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        })
        response.code(201)
        return response
    }
    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
    })
    response.code(500)
    return response
}

// menampilkan semua notes
const getAllNoteHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
})

// menampilkan note yang dipilih
const getNoteByIdHandler = (request, h) => {
    const { id } = request.params

    const note = notes.filter((n) => n.id === id)[0]

    if (note !== undefined) {
        return {
            status: 'success',
            data: {
                note,
            },
        }
    }
    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
    })
    response.code(404)
    return response
}

// update note
const editNoteByIdHandler = (request, h) => {
    // mengambil request dari id params
    const { id } = request.params
    // body yang di ambil dari id params
    const { title, tags, body } = request.payload
    
    const updatedAt = new Date().toISOString()
    const index = notes.findIndex((note) => note.id === id)

    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        }
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diperbaharui',
        })
        response.code(200)
        console.log(response)
        return response
    }
    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbaharui catatan. Id tidak ditemukan',
    })
    response.code(404)
    return response
}

// delete note
const deleteNoteByIdHandler = (request, h) => {
    // mengambil request id dari parameter
    const { id } = request.params

    const index = notes.findIndex((note) => note.id === id)

    if (index !== -1) {
        notes.splice(index, 1)
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus',
        })
        response.code(200)
        return response
    }
    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal dihapus. Id tidak ditemukan',
    })
    response.code(404)
    return response

}

module.exports = { 
    addNoteHandler, 
    getAllNoteHandler, 
    getNoteByIdHandler, 
    editNoteByIdHandler,
    deleteNoteByIdHandler,
}