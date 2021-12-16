import React from 'react'

const Step = ({formStep}: {formStep:any}) => {
    return (
        <div>
             {formStep < 2 && (
          <div className="container">
            <ul className="progressbar">
              <li className={formStep <= 2 ? 'active' : ''}>About you</li>
              <li className={formStep > 0 ? 'active' : ''}>Your Fit</li>
            </ul>
          </div>
        )}
        </div>
    )
}

export default Step
