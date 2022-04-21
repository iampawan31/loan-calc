import { useState, useEffect } from 'react'

const interestRates = [2.9, 3.1, 3.3, 3.6]

const App = () => {
  const [loanAmount, setLoanAmount] = useState(20000)
  const [loanTerms, setLoanTerms] = useState(4)
  const [repaymentTerms, setRepaymentTerms] = useState('weekly')

  const formattedLoanAmount = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumSignificantDigits: 5,
  }).format(loanAmount)

  useEffect(() => {
    // Calculate EMI and Total Repayment
  }, [loanAmount, loanTerms, repaymentTerms])

  return (
    <div className="App text-black bg-white h-full">
      <div className="flex flex-col h-screen">
        <div className="h-1/2">
          <img
            src="/loan-calc.png"
            className="h-full w-full object-cover"
            alt="loan calc"
          />
        </div>
        <div className="px-4 flex w-full justify-center h-1/2">
          <div className="relative w-full h-full">
            {/* Card */}
            <div className="bg-white shadow-lg rounded-lg p-8 absolute w-full -top-24 bottom-0 h-fit">
              {/* Card heading */}
              <div className="text-2xl font-semibold mb-8">
                Your interest calculator
              </div>
              {/* Card Body */}
              <div className="w-full flex flex-col">
                {/* Loan Amount */}
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <label className="font-semibold" htmlFor="loanAmount">
                      Loan Amount
                    </label>
                    <div className="text-primary font-semibold">
                      {formattedLoanAmount}
                    </div>
                  </div>
                  <input
                    name="loanAmount"
                    className="w-full"
                    type="range"
                    min="1000"
                    max="35000"
                    onChange={(e) => setLoanAmount(e.target.value)}
                    value={loanAmount}
                  />
                </div>
                {/* Loan Terms */}
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <label className="font-semibold" htmlFor="loanTerms">
                      Loan Terms
                    </label>
                  </div>
                  <select
                    name="loanTerms"
                    className="w-full border rounded py-2 border-gray"
                    onChange={(e) => setLoanTerms(e.target.value)}
                    value={loanTerms}
                  >
                    <option value="1">1 Year</option>
                    <option value="2">2 Year</option>
                    <option value="3">3 Year</option>
                    <option value="4">4 Year</option>
                  </select>
                </div>
                {/* Repayment Terms */}
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <label className="font-semibold" htmlFor="repaymentTerms">
                      Repayment Terms
                    </label>
                  </div>
                  <select
                    name="repaymentTerms"
                    className="w-full border rounded py-2 border-gray"
                    onChange={(e) => setRepaymentTerms(e.target.value)}
                    value={repaymentTerms}
                  >
                    <option value="weekly">Weekly</option>
                    <option value="fortnightly">Fortnightly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                  </select>
                </div>
                {/* Loan Summary */}
                <div className="flex w-full font-semibold">
                  <div className="w-1/2 flex flex-col">
                    <div className="capitalize">{`${repaymentTerms} repayments`}</div>
                    <div className="text-xl">$99.62</div>
                  </div>
                  <div className="w-1/2 flex flex-col">
                    <div>Total Repayments</div>
                    <div className="text-xl">$20,720</div>
                  </div>
                </div>
              </div>
              {/* Card Footer */}
              <div className="mt-6">
                <button className="bg-primary rounded-lg text-white px-2 py-4 w-full text-center">
                  Calculate repayments
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
