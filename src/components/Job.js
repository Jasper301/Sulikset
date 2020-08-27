import React from 'react'

function Job({ job, onCompleted }) {

   const [checked] = useState(false);

    const handletCompleted = () =>{
        console.log(checked)
        onCompleted(job);
    }

    const getStyle = (complete) =>({
        background: '#f4f4f4'
        textDeceration: complete ? 'line-through' : 'none'
    }

    return (

        <table> key={job.id} style={getStyle(job.completed)}>
            <tbody>
                <tr>
                    <td width="1%">
                        <input type="checkbox" defaultChecked = {onChange}={handletCompleted}></input>
                    </td>
                    <td width="59%">
                        {job.tyotehtava}
                    </td>


                    <td width="20%">   {job.osoite}
                    </td>

                    <td width="20%">
                        <a href={job.linkki} >LISÄTIETOA</a>
                    </td>
                </tr>
            </tbody>
        </table >

    )
}



export default Job;