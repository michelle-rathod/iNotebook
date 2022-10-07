import React from 'react'

export default function Alert(props) {
    const capitalize = (word)=>{
        if(word==='danger'){
            word = "error";
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
   
    return (
        <div style={{height:'50px'}}>
        {props.alerts &&
        <div>
            <div className={`alert alert-${props.alerts.type} alert-dismissible fade show`} role="alert" >
                <strong > {props.alerts.type}:</strong> {props.alerts.msg}
            </div>
        </div>}
        </div>
    )
}
