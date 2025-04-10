import React from 'react'

const Test = () => {
  return (
    <div>
         <div class="card">
                <div class="card-header">
                    <h5 class="card-title">Enable 2FA</h5>
                </div>
                <div class="card-body">

                    <form method="POST" action="http://192.168.10.189/staking/portal/twofactorenable">
                        

                        JE7UCWAJHN5NYENP

                        <div class="flex flex-row min-h-screen justify-center items-center gap-5">
                            <div className=''>
                                <ol>
                                    <li>1. Download and Install an app (Such as Google Authenticator or Authy) on your mobile device.</li>
                                    <li>2. Scan the QR Code.</li>
                                    <li>3. Eter And Verify the authentication code generated by the app</li>
                                </ol>
                               
                            </div>
                        </div>
                        <div className='mt-5'>
                            <p className='fw-semibold text-warning'>Important! Please write down the following safe code and keep it in a afe place. You MUST use the safe code to log in if you lose your authenticator.</p>
                        </div>

                        <div class="max-w-2/3 mx-auto">
                            <div class="grid grid-cols-1">
                                <div>
                                    <label for="simpleinput" class="text-default-800 text-sm font-medium inline-block mb-2">Enter the 6-digit code generated by the app</label>
                                    <input type="text" name="password" id="simpleinput" class="form-input" placeholder="OTP Code" />
                                </div>
                            </div>

                            <button type="submit" class="btn w-full bg-primary text-white mt-4">Enable</button>

                            <div id="msg" class="mt-5"></div>

                        </div>
                    </form>
                </div>
            </div>
    </div>
  )
}

export default Test