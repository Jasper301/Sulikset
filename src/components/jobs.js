import React from 'react'
import Job from './Job';

function Jobs({ jobs }) {
    const rows = () => jobs.map(job => {
        return <Job job={job} key={job.id} />
        
    })

    return (
        <div>
            {rows()}
        </div>
    )
}

export default Jobs;