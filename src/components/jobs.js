import React from 'react'
import Job from './Job';

function Jobs({ jobs onCompleted }) {

    const handleCompleted = (job) => {
        onCompleted(job);
    }

    const rows = () => jobs.map(job => {
        return <Job onCompleted={handCompleted} job={job} key={job.id} />
        
    })

    return (
        <div>
            {rows()}
        </div>
    )
}

export default Jobs;