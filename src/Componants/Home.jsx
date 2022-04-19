import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
// import $ from 'jquery';

export default function Home() {
  const [allNotes, setAllNotes] = useState([]);
  let token = localStorage.getItem("token");

  if (token) {
    var Token = jwt_decode(token);
  }

  const [Note, setNote] = useState({
    title: "",
    desc: "",
    userID: Token._id,
    token,
  });

  const [UpdatedNote, setUpdatedNote] = useState({
    title: "",
    desc: "",
    userID: Token._id,
    token,
  });

  // const [Loding, setLodaing] = useState(false);
  const [currentNote, setCurrentNote] = useState("");

  async function getNotes() {
    let { data } = await axios.get(
      "https://route-egypt-api.herokuapp.com/getUserNotes",
      {
        headers: {
          token,
          UserID: Token._id,
        },
      }
    );
    setAllNotes(data.Notes);
  }

  async function DeletNote(ID) {
    let { data } = await axios.delete(
      "https://route-egypt-api.herokuapp.com/deleteNote",
      {
        data: {
          NoteID: ID,
          token,
        },
      }
    );
    if (data.message === "deleted") {
      getNotes();
    }
  }

  function setAddNote({ target }) {
    setNote({ ...Note, [target.name]: target.value });
  }

  async function addNote() {
    let { data } = await axios.post(
      "https://route-egypt-api.herokuapp.com/addNote",
      Note
    );
    if (data.message === "success") {
      // setLodaing(true);
      // $('#exampleModal').modal('toggle');
      getNotes();
    }
  }

  function setUpdateNote({ target }) {
    setUpdatedNote({ ...UpdatedNote, [target.name]: target.value });
  }

  async function UpdateNote() {
    let { data } = await axios.put(
      "https://route-egypt-api.herokuapp.com/updateNote",
      {
        ...UpdatedNote,
        NoteID: currentNote._id,
      }
    );

    getNotes();
  }

  useEffect(() => {
    getNotes();

  }, [])

  useEffect(() => {


  }, [UpdatedNote])


  return (
    <div className=" text-start container ">
      <button
        type="button"
        className="btn btn-transparent text-white mainHover float-end p-2 fs-5"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        data-bs-whatever="@mdo"
      >
        <i className="fas fa-plus-circle "></i> Add New
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                New Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className={`text-start`}>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Title:
                  </label>
                  <input
                    onChange={setAddNote}
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    name="title"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    Message:
                  </label>
                  <textarea
                    onChange={setAddNote}
                    className="form-control"
                    id="message-text"
                    name="desc"
                  ></textarea>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    onClick={addNote}
                    type="button"
                    className="btn btn-primary"
                  >
                    Send Note
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="noted"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                New Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className={`text-start`}>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Title:
                  </label>
                  <input
                    onChange={setUpdateNote}
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    name="title"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    Message:
                  </label>
                  <textarea
                    onChange={setUpdateNote}
                    className="form-control"
                    id="message-text"
                    name="desc"
                  ></textarea>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    onClick={UpdateNote}
                    type="button"
                    className="btn btn-primary"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className={`row`}>
        {/* {Loding ? "" : ""} */}
        {allNotes &&
          allNotes.map((value, index) => {
            return (
              <div key={value._id} className={`note p-3 col-md-4 m-3`}>
                <div
                  className={`d-flex justify-content-between align-items-center p-3`}
                >
                  <div>
                    <h4 className={`text-center fs-3 Upper`}>{value.title}</h4>
                  </div>
                  <div className={`fs-4`}>
                    <i
                      data-bs-toggle="modal"
                      data-bs-target="#noted"
                      className="far fa-edit p-1 edit"
                      onClick={() => setCurrentNote(value)}
                    ></i>
                    <i
                      onClick={() => {
                        DeletNote(value._id);
                      }}
                      className="far fa-trash-alt p-1 del"
                    ></i>
                  </div>
                </div>
                <div>
                  <p className={`text-center orange fs-5`}>{`( ${value.desc} )`}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
