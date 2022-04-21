import { useState, useEffect, useRef } from 'react'

const interestRates = [2.9, 3.1, 3.3, 3.6]

const App = () => {
  const [loanAmount, setLoanAmount] = useState(20000)
  const rangeRef = useRef()
  const [loanTerms, setLoanTerms] = useState(4)
  const [repaymentTerms, setRepaymentTerms] = useState('weekly')
  const [totalRepayments, setTotalRepayments] = useState(0)
  const [emi, setEmi] = useState(0)

  const calculateLoanTerms = () => {
    switch (repaymentTerms) {
      case 'weekly':
        return loanTerms * 52
      case 'fortnightly':
        return loanTerms * 26
      case 'monthly':
        return loanTerms * 12
      default:
        break
    }
  }

  // Accrued Amount = A = P(1 + r/n)nt
  const calculateEMI = () => {
    const yearlyInterestRate = interestRates[loanTerms - 1] / 100
    const loanTerm = calculateLoanTerms()

    const accruedAmount = parseInt(
      loanAmount * (1 + yearlyInterestRate / loanTerm) ** (loanTerm * loanTerms)
    )

    setEmi(formattedAmount(parseInt(accruedAmount / loanTerm)))
    setTotalRepayments(formattedAmount(accruedAmount))
  }

  const formattedAmount = (amount) => {
    return Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumSignificantDigits: 5,
    }).format(amount)
  }

  // Calculate the initial EMI and Repayments Amount
  useEffect(() => {
    calculateEMI()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const currentBackgroundSize =
      ((rangeRef.current.value - rangeRef.current.min) * 100) /
      (rangeRef.current.max - rangeRef.current.min)
    console.log(currentBackgroundSize, 57)
    rangeRef.current.style.backgroundSize = currentBackgroundSize + '% 100%'
  }, [loanAmount])

  return (
    <div className="App text-black bg-white h-full relative">
      <div className="flex flex-col lg:flex-row h-screen">
        <div className="h-1/2 md:h-2/3 lg:w-full lg:h-full flex lg:flex-row">
          <div className="bg-primary h-full w-1/4 invisible lg:visible" />
          <img
            src="/loan-calc.png"
            className="h-auto w-full lg:w-3/4 object-cover"
            alt="loan calc"
          />
        </div>
        <div className="px-4 lg:hidden flex w-full justify-center h-1/2 md:h-1/3"></div>
      </div>

      {/* Card */}
      <div className="lg:bg-white lg:shadow-lg top-80 md:top-none md:inset-y-1/2 bottom-0 lg:rounded-lg w-full h-fit p-4 lg:p-8 mx-0 absolute lg:max-w-xl lg:inset-y-0 lg:inset-x-1 lg:m-10">
        <div className="bg-white p-4 shadow-lg rounded-lg lg:bg-transparent lg:p-0 lg:shadow-none lg:rounded-none">
          {/* Card heading */}
          <div className="text-2xl lg:text-3xl font-bold mb-8 lg:mb-16">
            Your interest calculator
          </div>
          {/* Card Body */}
          <div className="w-full flex flex-col">
            {/* Loan Amount */}
            <div className="mb-6 lg:mb-10">
              <div className="flex justify-between mb-2">
                <label className="font-bold" htmlFor="loanAmount">
                  Loan Amount
                </label>
                <div className="text-primary font-bold">
                  {formattedAmount(loanAmount)}
                </div>
              </div>
              <input
                ref={rangeRef}
                name="loanAmount"
                className="w-full"
                type="range"
                min="1000"
                max="35000"
                onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                value={loanAmount}
              />
            </div>
            {/* Loan Terms */}
            <div className="mb-6 lg:mb-10">
              <div className="flex justify-between mb-2">
                <label className="font-bold" htmlFor="loanTerms">
                  Loan Terms
                </label>
              </div>
              <select
                name="loanTerms"
                className="w-full border rounded py-2 border-gray bg-white appearance-none text-black px-2"
                onChange={(e) => setLoanTerms(parseInt(e.target.value))}
                value={loanTerms}
              >
                <option value="1">1 Year</option>
                <option value="2">2 Year</option>
                <option value="3">3 Year</option>
                <option value="4">4 Year</option>
              </select>
            </div>
            {/* Repayment Terms */}
            <div className="mb-6 lg:mb-10">
              <div className="flex justify-between mb-2">
                <label className="font-bold" htmlFor="repaymentTerms">
                  Repayment Terms
                </label>
              </div>
              <select
                name="repaymentTerms"
                className="w-full border rounded py-2 border-gray bg-white appearance-none text-black px-2"
                onChange={(e) => setRepaymentTerms(e.target.value)}
                value={repaymentTerms}
              >
                <option value="weekly">Weekly</option>
                <option value="fortnightly">Fortnightly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            {/* Loan Summary */}
            <div className="flex w-full font-bold">
              <div className="w-1/2 flex flex-col">
                <div className="capitalize">{`${repaymentTerms} repayments`}</div>
                <div className="text-xl">{emi}</div>
              </div>
              <div className="w-1/2 flex flex-col">
                <div>Total Repayments</div>
                <div className="text-xl">{totalRepayments}</div>
              </div>
            </div>
          </div>
          {/* Card Footer */}
          <div className="mt-6 lg:mt-16">
            <button
              onClick={calculateEMI}
              className="bg-primary rounded-lg text-white px-2 py-4 w-full text-center"
            >
              Calculate repayments
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
