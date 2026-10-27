

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const useTrackSearch = function(){
    const navigate = useNavigate()
    const [value, setValue] = useState('')

    const submit = function(){
        const id = value.trim().toUpperCase()
        if (!id) {
            return
        }
        navigate(`/tracking/${encodeURIComponent(id)}`)
    }

    const onKeyDown = function(event){
        if (event.key === 'Enter') {
            submit()
        }
    }

    return { value, setValue, submit, onKeyDown }
}

export default useTrackSearch