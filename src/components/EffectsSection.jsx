import { useEffect, useState, useCallback } from "react";
import Button from "./Button/Button";
import Modal from "./Model/Modal";
import useInput from "../hooks/useInput";


export default function EffectsSection(){
   const input =  useInput()
   const [modal, setModal] = useState(false)
   const [loading, setLoading] = useState(false)
   const [users, setUsers]=useState([])

   const fetchUsers = useCallback( async ()=>{
      setLoading(true)
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      const users = await response.json()
      setUsers(users)
      setLoading(false)
   }, [])


   useEffect(()=>{
       fetchUsers()  
   }, [fetchUsers])

   
   return(
      <section>
         <h3>Effects</h3>

         <Button style={{marginBottom: '1rem'}} onClick={() => setModal(true)}>Открыть информацию</Button>

         <Modal open={modal}>
            <h3>Hello from Modal</h3>
            <p>Lorem ipsum dolor sit amet consectetur 
               adipisicing elit. Ab, officiis obcaecati 
               sint dolorum maiores aspernatur aliquid,
                assumenda sit soluta deserunt laborum 
                consequuntur corporis maxime tempora eos
                 magni ea aliquam voluptatum?</p>
            <Button onClick={()=>setModal(false)}>Close modal</Button>

         </Modal>

         {loading &&   <p>Loading...</p>}

         {!loading && ( <>
            <input type="text" placeholder="Search user" className="control" {...input} />
           
            <ul>
               {users.filter(user=>user.name.toLowerCase().includes(input.value.toLowerCase())).map((user)=>(
                  <li key={user.id}>{user.name}</li>
               ))}
            </ul>
            </>
         )}

      </section>
   )
}