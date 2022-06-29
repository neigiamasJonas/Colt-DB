import { useContext } from "react";
import { useEffect } from "react";
import UserContext from "./UserContext";

function UserEdit() {

    const {modalDataUsers, setModalDataUsers, setEditDataUsers} = useContext(UserContext);


    useEffect(() => {
        if(modalDataUsers === null) {
            return;
        }
        
        // console.log(colors);
        // console.log(modalData);

    }, [modalDataUsers]);


    const handleEdit = () => {
        const data = {} // 

        setEditDataUsers(data)
        setModalDataUsers(null);  
        // console.log(data);
        // console.log(colors);
    }


    
    if (setModalDataUsers === null) {
        return null;
    }

    return(
        <>
        <div className="modal">
            <div className="modal-box">
                <div className="modal-content">
                    <button type="button" className="close-button" onClick={() => setModalDataUsers(null)}>
                        <span>x</span>
                    </button>
                    <div className="modal-header">
                        <h4 className="modal-title">User Edit</h4>
                    </div>

                    <div className="modal-body">
                        

                        <div className='modal-footer'>
                            <button type='button' className='button' onClick={() => setModalDataUsers(null)}>Close</button>
                            <button type='button' className='button' onClick={handleEdit}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default UserEdit;