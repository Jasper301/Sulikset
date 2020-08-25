import React from 'react'

function Job({ job }) {
    return (

        <table>
            <tbody>
                <tr>
                    <td width="1%">
                        <input type="checkbox"></input>
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