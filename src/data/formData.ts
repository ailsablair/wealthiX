export interface FormLineItem {
  id: string;
  lineNumber: string;
  name: string;
  simpleLabel: string;
  description: string;
  examples: string[];
  tips: string[];
}

export interface FormSection {
  id: string;
  title: string;
  subtitle: string;
  type: 'income' | 'deduction' | 'expense';
  colorScheme: 'success' | 'warning' | 'primary' | 'neutral' | 'danger';
  items: FormLineItem[];
}

export const formSections: FormSection[] = [
  {
    id: 'income',
    title: 'Monthly Income',
    subtitle: 'All money coming into your household each month (use gross/before-tax amounts)',
    type: 'income',
    colorScheme: 'success',
    items: [
      {
        id: 'employment-income',
        lineNumber: '1',
        name: 'Employment Income',
        simpleLabel: 'Pay from your job(s)',
        description:
          'Your total wages, salary, commissions, overtime, tips, or bonuses from any employer. Use the GROSS amount (before taxes are taken off).',
        examples: [
          'Your regular paycheque of $1,800 every two weeks → $3,600/month',
          'Hourly wage of $22/hr × 40 hrs/week × 4.33 = $3,808/month',
          'Monthly salary of $4,200 deposited to your account',
          'Tips from restaurant work averaging $600/month',
        ],
        tips: [
          'Always enter your GROSS (pre-tax) amount — deductions like taxes and CPP are claimed separately',
          'If income changes month-to-month, use the average of your last 3 months',
          'Include income from all jobs, even part-time or casual work',
          'Include overtime, commissions, and bonuses received',
        ],
      },
      {
        id: 'self-employment',
        lineNumber: '2',
        name: 'Self-Employment Income',
        simpleLabel: 'Income from your own business or freelance work',
        description:
          'Net income from running your own business, freelancing, or contract work. This is your revenue MINUS your business expenses.',
        examples: [
          'Hairdresser working from home earning $2,200/month after supplies',
          'Uber/Lyft driver netting $1,500/month after gas and wear-and-tear',
          'Freelance graphic designer averaging $3,000/month in contracts',
          'Home daycare operator netting $1,800/month after expenses',
        ],
        tips: [
          'Use your NET income (after business expenses) — not your gross revenue',
          'Keep receipts for all business expenses to reduce your reportable income',
          'Vehicle costs, home office, supplies, and tools can reduce self-employment income',
          'If income is irregular, average your last 3-6 months',
        ],
      },
      {
        id: 'ei-benefits',
        lineNumber: '3',
        name: 'Employment Insurance (EI) Benefits',
        simpleLabel: 'EI payments while unemployed or on parental leave',
        description:
          'Government benefits paid when you are between jobs, on maternity or parental leave, or off work due to illness or caregiving.',
        examples: [
          'Regular EI benefits of $2,200/month while job hunting',
          'Maternity EI benefits of $1,400/month',
          'Parental EI benefits shared between partners',
          'Sickness EI benefits during a medical leave',
        ],
        tips: [
          'Enter the gross EI amount before any deductions',
          'EI is taxable income — the tax is usually deducted at source',
          'Include all types: regular, maternity, parental, sickness, caregiver',
        ],
      },
      {
        id: 'social-assistance',
        lineNumber: '4',
        name: 'Social Assistance / Government Support',
        simpleLabel: 'Ontario Works, ODSP, or provincial welfare payments',
        description:
          'Monthly payments from your province for living costs when you have low or no income. Each province has a different name for these programs.',
        examples: [
          'Ontario Works (OW) basic needs allowance of $733/month',
          'Ontario Disability Support Program (ODSP) of $1,228/month',
          'BC Income Assistance of $935/month',
          'Alberta Assured Income for the Severely Handicapped (AISH)',
        ],
        tips: [
          'Include any shelter allowance in addition to the basic allowance',
          'Social assistance is generally lower than the bankruptcy surplus threshold',
          'Inform your trustee that you receive social assistance — special rules may apply',
        ],
      },
      {
        id: 'cpp-oas',
        lineNumber: '5',
        name: 'Canada Pension Plan (CPP) / Old Age Security (OAS)',
        simpleLabel: 'Government pension payments',
        description:
          'Monthly pension payments from the Government of Canada based on your work history (CPP) or age (OAS). Include both if you receive them.',
        examples: [
          'CPP retirement pension of $850/month',
          'OAS basic pension of $685/month',
          'CPP disability benefits of $1,100/month',
          'Survivor\'s CPP benefit of $450/month',
        ],
        tips: [
          'Include both CPP and OAS amounts if you receive both',
          'CPP disability is included here — it counts as income',
          'These amounts are usually shown on your CRA My Account or a T4A(P) slip',
        ],
      },
      {
        id: 'private-pension',
        lineNumber: '6',
        name: 'Private or Work Pension',
        simpleLabel: 'Pension from a former employer or RRIF withdrawals',
        description:
          'Monthly income from a company pension plan, annuity, or regular withdrawals from your RRIF/RRSP.',
        examples: [
          'Monthly defined-benefit pension from former employer of $1,400',
          'Locked-In Retirement Account (LIRA) payment of $900/month',
          'RRIF monthly withdrawal of $500/month',
          'Annuity payment of $700/month from an insurance company',
        ],
        tips: [
          'Enter the gross amount before tax is withheld',
          'RRSP withdrawals count as income in the month received',
          'Contact your pension administrator for the monthly gross amount',
        ],
      },
      {
        id: 'child-benefit',
        lineNumber: '7',
        name: 'Canada Child Benefit (CCB)',
        simpleLabel: 'Monthly payments for your children',
        description:
          'Tax-free monthly payments from the Canada Revenue Agency (CRA) to help with the cost of raising children under 18.',
        examples: [
          'CCB for two children under 6: $1,200/month',
          'CCB for one child aged 10: $560/month',
          'Ontario Child Benefit supplement added to CCB',
        ],
        tips: [
          'CCB is tax-free and not based on income at the time of payment',
          'Include provincial child benefit supplements in this line',
          'If you share custody, only include your portion of the CCB',
        ],
      },
      {
        id: 'support-received',
        lineNumber: '8',
        name: 'Child or Spousal Support Received',
        simpleLabel: 'Support payments you receive from an ex-spouse/partner',
        description:
          'Regular payments you receive from a former spouse or partner for child support or spousal support (alimony).',
        examples: [
          'Court-ordered child support of $600/month from your ex',
          'Spousal support (alimony) of $800/month',
          'Informal support arrangement of $400/month',
        ],
        tips: [
          'Child support received is generally tax-free and must be included',
          'Spousal support received is taxable income',
          'Include both child and spousal support on this line',
        ],
      },
      {
        id: 'rental-income',
        lineNumber: '9',
        name: 'Rental Income',
        simpleLabel: 'Income from renting out property or a room',
        description:
          'Money received from tenants renting your property or a room in your home. Use the NET amount after allowable rental expenses.',
        examples: [
          'Renting basement apartment for $1,200/month',
          'Renting a spare room to a student for $700/month',
          'Airbnb income averaging $900/month net of expenses',
        ],
        tips: [
          'You can deduct costs like mortgage interest, property tax, and repairs proportional to the rental unit',
          'Keep records of rental expenses to reduce your reportable rental income',
          'Your trustee will need to know if you own rental property',
        ],
      },
      {
        id: 'investment-income',
        lineNumber: '10',
        name: 'Investment Income',
        simpleLabel: 'Dividends or interest from savings and investments',
        description:
          'Monthly income from interest on savings accounts, GICs, dividends from stocks, or other investment returns.',
        examples: [
          'Monthly interest from GIC of $75',
          'Dividend payments from stock portfolio of $150/month',
          'Interest from savings account of $30/month',
        ],
        tips: [
          'Only include amounts actually received this month, not paper gains',
          'If dividends are reinvested (DRIP), you may not need to include them',
          'Ask your trustee how to handle irregular investment income',
        ],
      },
      {
        id: 'other-income',
        lineNumber: '11',
        name: 'Other Income',
        simpleLabel: 'Any other money coming in',
        description:
          'Any other regular income not listed above. This includes gifts, informal income, GST/HST credit, and other government payments.',
        examples: [
          'GST/HST credit: $467 paid quarterly (~$116/month)',
          'Ontario Trillium Benefit paid monthly',
          'Regular financial gifts from family',
          'Workers\' compensation (WSIB) payments',
        ],
        tips: [
          'Include the monthly equivalent of quarterly payments (divide by 3)',
          'Workers\' Compensation (WSIB/WCB) benefits are included here',
          'Ask your trustee if you receive any unusual or large one-time payments',
        ],
      },
    ],
  },
  {
    id: 'deductions',
    title: 'Non-Discretionary Deductions',
    subtitle: 'These are required deductions taken from your income — you have no choice but to pay them',
    type: 'deduction',
    colorScheme: 'warning',
    items: [
      {
        id: 'federal-tax',
        lineNumber: 'D1',
        name: 'Federal Income Tax',
        simpleLabel: 'Federal tax deducted from your pay',
        description:
          'Federal income tax automatically withheld from your paycheque each pay period. Check your pay stub for this amount.',
        examples: [
          'Your pay stub shows "Federal Tax: $320" per bi-weekly pay = $693/month',
          'CRA tax withheld from your pension payments',
        ],
        tips: [
          'Find this on your pay stub — it\'s usually labeled "Federal Tax" or "Income Tax"',
          'If you\'re self-employed, estimate based on your tax bracket and quarterly installments',
          'This reduces your net income and lowers your surplus income calculation',
        ],
      },
      {
        id: 'provincial-tax',
        lineNumber: 'D2',
        name: 'Provincial Income Tax',
        simpleLabel: 'Provincial tax deducted from your pay',
        description:
          'Provincial income tax withheld from your paycheque. This is separate from federal tax.',
        examples: [
          'Ontario provincial tax on pay stub: $180/bi-weekly = $390/month',
          'BC provincial tax of $220/month',
        ],
        tips: [
          'Look on your pay stub for "Provincial Tax" or your province\'s name',
          'Both federal and provincial tax together make up your income tax deductions',
        ],
      },
      {
        id: 'ei-premiums',
        lineNumber: 'D3',
        name: 'Employment Insurance (EI) Premiums',
        simpleLabel: 'EI contributions taken off your paycheque',
        description:
          'Mandatory EI contributions deducted from your paycheque. The amount is based on your insurable earnings.',
        examples: [
          'EI premium shown on pay stub: $35/bi-weekly = $76/month',
          '2024 EI premium rate: 1.66% on insurable earnings',
        ],
        tips: [
          'Find this on your pay stub — labeled "EI" or "Employment Insurance"',
          'Self-employed? You may pay a different rate or may not pay EI at all',
        ],
      },
      {
        id: 'cpp-contributions',
        lineNumber: 'D4',
        name: 'Canada Pension Plan (CPP) Contributions',
        simpleLabel: 'CPP contributions from your paycheque',
        description:
          'Mandatory CPP contributions taken from your paycheque each pay period.',
        examples: [
          'CPP contribution shown on pay stub: $95/bi-weekly = $206/month',
          '2024 CPP contribution rate: 5.95% on pensionable earnings',
        ],
        tips: [
          'Look for "CPP" on your pay stub',
          'Self-employed people pay BOTH the employee and employer portion (11.9%)',
          'Note: CPP2 may also appear on your stub if your earnings are above the first ceiling',
        ],
      },
      {
        id: 'health-dental-insurance',
        lineNumber: 'D5',
        name: 'Employer Health & Dental Insurance Premiums',
        simpleLabel: 'Your share of work health/dental plan costs',
        description:
          'Your portion of premiums for a health or dental insurance plan provided through your employer. These are deducted from your pay.',
        examples: [
          'Employee share of group benefits plan: $120/month',
          'Dental plan employee premium: $45/month deducted at source',
          'Extended health care employee contribution: $75/month',
        ],
        tips: [
          'Look on your pay stub for "Benefits", "Health Plan", or "Group Insurance"',
          'Only claim your portion — not what your employer pays',
          'If you pay for private health insurance yourself (not through work), claim it as a medical expense instead',
        ],
      },
      {
        id: 'life-insurance-mandatory',
        lineNumber: 'D6',
        name: 'Mandatory Life Insurance (Employer)',
        simpleLabel: 'Required life insurance through your employer',
        description:
          'Basic life insurance premium required by your employer and deducted from your pay. (Voluntary top-up plans are discretionary.)',
        examples: [
          'Basic group life insurance required by employer: $25/month',
        ],
        tips: [
          'Only claim the MANDATORY amount — not any optional coverage you chose to add',
          'Look on your pay stub for "Life Insurance" or "Group Life"',
        ],
      },
      {
        id: 'employer-pension-contributions',
        lineNumber: 'D7',
        name: 'Employer Pension Plan Contributions',
        simpleLabel: 'Contributions to a workplace pension plan',
        description:
          'If your employer requires you to contribute to a pension plan (like HOOPP, OMERS, or CUPE), your employee contribution is non-discretionary.',
        examples: [
          'HOOPP contribution (healthcare workers): $220/month',
          'OMERS contribution (municipal workers): $195/month',
          'CUPE defined benefit plan: $180/month',
        ],
        tips: [
          'Only claim mandatory contributions — not optional voluntary top-ups',
          'Government/public sector workers often have required pension plan contributions',
        ],
      },
      {
        id: 'union-dues',
        lineNumber: 'D8',
        name: 'Union Dues / Professional Association Fees',
        simpleLabel: 'Required dues for your union or professional body',
        description:
          'Mandatory membership fees for a union (e.g., CUPE, Unifor) or a professional licensing body (e.g., Law Society, College of Nurses).',
        examples: [
          'Monthly union dues: $65/month',
          'Nursing registration fee spread monthly: $25/month',
          'Engineers Ontario monthly membership: $20/month',
        ],
        tips: [
          'Both union dues and required professional licensing fees qualify',
          'Optional professional association memberships are discretionary',
        ],
      },
      {
        id: 'support-paid',
        lineNumber: 'D9',
        name: 'Child or Spousal Support Payments Made',
        simpleLabel: 'Court-ordered support you pay to an ex-spouse/partner',
        description:
          'Court-ordered or written agreement payments you make each month for child support or spousal support (alimony).',
        examples: [
          'Court-ordered child support of $850/month to ex-partner',
          'Spousal support order of $600/month',
          'Combined child and spousal support of $1,200/month',
        ],
        tips: [
          'This must be court-ordered or part of a written separation agreement',
          'Include child support AND spousal support paid',
          'Voluntary informal payments may not qualify — ask your trustee',
        ],
      },
    ],
  },
  {
    id: 'living',
    title: 'Daily Living Expenses',
    subtitle: 'Regular costs of day-to-day life for you and your household',
    type: 'expense',
    colorScheme: 'primary',
    items: [
      {
        id: 'food-groceries',
        lineNumber: 'E1',
        name: 'Food / Groceries',
        simpleLabel: 'Grocery shopping and household food',
        description:
          'All food purchased for home consumption: groceries, household staples, and non-alcoholic beverages.',
        examples: [
          'Weekly grocery run of $200 for family of 4 = $866/month',
          'Solo grocery shopping averaging $350/month',
          'Costco/bulk food purchases averaged monthly',
          'Specialty dietary food (gluten-free, allergen-free)',
        ],
        tips: [
          'Claim your realistic grocery spending — not an artificially low number',
          'Specialty dietary food required for a medical condition can be claimed as a medical expense',
          'Include household staples like dish soap, paper towels, and cleaning products in this line',
          'The OSB guidelines recognize that family size increases this amount',
        ],
      },
      {
        id: 'clothing',
        lineNumber: 'E2',
        name: 'Clothing and Footwear',
        simpleLabel: 'Clothes for you and your family',
        description:
          'Reasonable spending on clothing and shoes for you and any dependants.',
        examples: [
          'School clothing for children: $150/month average',
          'Work-required clothing (uniform, safety boots): $50/month',
          'Seasonal clothing purchases averaged over the year',
        ],
        tips: [
          'Claim your actual average — account for seasonal purchases (winter coats, etc.)',
          'Work-required clothing or safety gear can be claimed here or as a work expense',
          'Children grow fast — factor in replacing their clothing regularly',
        ],
      },
      {
        id: 'personal-care',
        lineNumber: 'E3',
        name: 'Personal Care',
        simpleLabel: 'Haircuts, toiletries, and hygiene products',
        description:
          'Costs for maintaining personal hygiene and grooming: haircuts, shampoo, toothpaste, soap, deodorant, razor blades, etc.',
        examples: [
          'Monthly haircut: $35',
          'Toiletries (shampoo, soap, toothpaste, deodorant): $60/month',
          'Women\'s hygiene products: $20/month',
          'Family personal care total: $120/month',
        ],
        tips: [
          'This is recognized as a necessary expense — claim your actual costs',
          'Prescription skincare or specialized hygiene products for a medical condition may qualify as a medical expense',
        ],
      },
      {
        id: 'recreation',
        lineNumber: 'E4',
        name: 'Recreation and Entertainment',
        simpleLabel: 'Hobbies, outings, and family activities',
        description:
          'Reasonable costs for leisure, hobbies, and family recreational activities. Some level of recreation is recognized as necessary for well-being.',
        examples: [
          'Children\'s sports or extracurricular activities (see Childcare section for dedicated costs)',
          'Family outing to a museum or community event',
          'Hobby supplies (gardening, crafts, books)',
        ],
        tips: [
          'A reasonable amount for recreation is accepted — this should reflect reality',
          'Children\'s organized sports or lessons may be better claimed under Childcare',
          'Basic recreation is recognized as a human need in the OSB guidelines',
        ],
      },
      {
        id: 'gifts-donations',
        lineNumber: 'E5',
        name: 'Gifts and Charitable Donations',
        simpleLabel: 'Birthday gifts, holiday gifts, and charitable giving',
        description:
          'Reasonable monthly average for gifts to family members and regular charitable contributions.',
        examples: [
          'Birthday/holiday gifts averaged over the year: $50/month',
          'Regular church or religious tithing: $100/month',
          'Food bank or charity donations: $30/month',
        ],
        tips: [
          'Average your annual gift spending across 12 months',
          'Religious tithes and regular charitable donations are recognized',
          'Keep this reasonable and reflective of your actual giving',
        ],
      },
      {
        id: 'other-living',
        lineNumber: 'E6',
        name: 'Other Living Expenses',
        simpleLabel: 'Any other regular living costs not listed elsewhere',
        description:
          'Miscellaneous living costs that don\'t fit elsewhere: newspapers, books, laundromat, etc.',
        examples: [
          'Laundromat costs: $40/month',
          'Books and reading materials: $20/month',
          'Bank fees and charges: $15/month',
        ],
        tips: [
          'Only include regular, recurring expenses here',
          'Bank fees and service charges are a valid living expense',
        ],
      },
    ],
  },
  {
    id: 'housing',
    title: 'Housing & Utilities',
    subtitle: 'Costs to keep a roof over your head and keep the lights on',
    type: 'expense',
    colorScheme: 'primary',
    items: [
      {
        id: 'rent-mortgage',
        lineNumber: 'H1',
        name: 'Rent or Mortgage Payment',
        simpleLabel: 'Monthly rent or mortgage',
        description:
          'Your monthly rent payment or mortgage payment (principal + interest). Do not include property tax or home insurance if listed separately.',
        examples: [
          'Monthly apartment rent: $1,450',
          'Mortgage payment (P+I): $1,650/month',
          'Basement suite rent: $1,100/month',
        ],
        tips: [
          'Include your full monthly rent or mortgage amount',
          'If you pay first/last month\'s rent as a deposit, only claim regular monthly rent',
          'Claim your actual rent even if it seems high — the OSB recognizes housing costs vary by region',
        ],
      },
      {
        id: 'property-tax',
        lineNumber: 'H2',
        name: 'Property Tax',
        simpleLabel: 'Annual property tax divided into monthly',
        description:
          'If you own your home, your municipal property tax. Divide your annual bill by 12 to get the monthly amount.',
        examples: [
          'Annual property tax $4,200 ÷ 12 = $350/month',
          'Property tax included in your mortgage payment (include it here)',
        ],
        tips: [
          'Renters: skip this — your landlord pays it',
          'If your mortgage includes a property tax component (escrow), include it here',
          'Check your annual tax notice from your municipality',
        ],
      },
      {
        id: 'home-insurance',
        lineNumber: 'H3',
        name: 'Home/Tenant Insurance',
        simpleLabel: 'Home or renter\'s insurance',
        description:
          'Monthly cost of insuring your home (homeowner\'s insurance) or apartment (tenant/renter\'s insurance).',
        examples: [
          'Tenant insurance: $35/month',
          'Homeowner\'s insurance: $120/month',
          'Annual policy of $1,440 ÷ 12 = $120/month',
        ],
        tips: [
          'Both homeowner\'s and tenant\'s insurance are valid expenses',
          'Tenant\'s insurance is strongly recommended and a legitimate expense',
        ],
      },
      {
        id: 'electricity',
        lineNumber: 'H4',
        name: 'Electricity / Hydro',
        simpleLabel: 'Electricity or hydro bill',
        description:
          'Monthly cost of electricity (called "hydro" in much of Canada).',
        examples: [
          'Toronto Hydro bill: $90/month average',
          'Rural electricity in winter: $200/month',
          'Apartment utilities included in rent: $0 here',
        ],
        tips: [
          'Use your 12-month average if bills vary by season',
          'If utilities are included in rent, don\'t claim them again here',
        ],
      },
      {
        id: 'heat',
        lineNumber: 'H5',
        name: 'Heat / Natural Gas / Heating Oil',
        simpleLabel: 'Heating your home',
        description:
          'Monthly cost to heat your home — natural gas, propane, heating oil, or wood pellets.',
        examples: [
          'Enbridge gas bill (Ontario): $110/month average',
          'Propane delivery, rural home: $150/month winter average',
          'Electric baseboard heat (included in hydro bill): $0 here',
        ],
        tips: [
          'If you heat with electricity and it\'s already in your hydro bill, don\'t double-count',
          'Use your annual average (annual total ÷ 12) since heating costs are seasonal',
        ],
      },
      {
        id: 'water',
        lineNumber: 'H6',
        name: 'Water and Sewage',
        simpleLabel: 'Water bill',
        description:
          'Municipal water and sewage charges. Often billed quarterly — divide annual total by 12.',
        examples: [
          'Quarterly water bill of $180 ÷ 3 = $60/month',
          'Monthly water utility: $55',
        ],
        tips: [
          'Many municipalities bill quarterly — divide by 3 for monthly amount',
          'If water is included in rent, don\'t claim separately',
        ],
      },
      {
        id: 'cell-phone',
        lineNumber: 'H7',
        name: 'Cell Phone',
        simpleLabel: 'Monthly cell phone bill',
        description:
          'Your monthly cell phone plan cost. A cell phone is considered a basic necessity in today\'s world.',
        examples: [
          'Rogers/Bell/Telus plan: $65/month',
          'Budget carrier plan (Koodo, Fido, Freedom): $35/month',
          'Family plan — your share: $45/month',
        ],
        tips: [
          'A basic cell phone plan is recognized as a necessary expense',
          'Claim only your share of a family plan',
          'If you also have a landline, claim both (but consider whether both are necessary)',
        ],
      },
      {
        id: 'internet',
        lineNumber: 'H8',
        name: 'Internet',
        simpleLabel: 'Home internet service',
        description:
          'Monthly home internet bill. Internet is considered an essential service for employment, healthcare, and education.',
        examples: [
          'Rogers/Bell internet: $65-90/month',
          'TekSavvy or budget ISP: $55/month',
          'Internet included in rent: $0 here',
        ],
        tips: [
          'Home internet is recognized as essential — claim your actual cost',
          'If you work from home or children attend school online, this is even more clearly non-discretionary',
        ],
      },
      {
        id: 'cable-streaming',
        lineNumber: 'H9',
        name: 'Cable / Satellite / Streaming Services',
        simpleLabel: 'TV services and streaming subscriptions',
        description:
          'Monthly cost of cable TV, satellite, or streaming services (Netflix, Disney+, Crave, etc.).',
        examples: [
          'Basic cable package: $45/month',
          'Netflix + Crave + Disney+ total: $40/month',
          'Satellite TV in rural area: $75/month',
        ],
        tips: [
          'Basic cable or one streaming service is generally accepted',
          'Multiple streaming services may be questioned — be honest and reasonable',
          'In rural areas without access to libraries, entertainment may carry more weight',
        ],
      },
      {
        id: 'home-maintenance',
        lineNumber: 'H10',
        name: 'Home Maintenance and Repairs',
        simpleLabel: 'Repairs and upkeep of your home',
        description:
          'Regular costs to maintain your home: minor repairs, appliance maintenance, lawn care, snow removal, etc.',
        examples: [
          'Lawn mowing service: $60/month May-Oct',
          'Snow removal service: $80/month Nov-Mar',
          'Average home maintenance averaged over year: $100/month',
          'Condo maintenance fee: $425/month',
        ],
        tips: [
          'Condo fees (if applicable) go here — they cover much of this',
          'Average irregular expenses across 12 months',
          'Renters: building maintenance is your landlord\'s responsibility — skip this',
        ],
      },
    ],
  },
  {
    id: 'transportation',
    title: 'Transportation',
    subtitle: 'Costs to get yourself to work, appointments, and essential activities',
    type: 'expense',
    colorScheme: 'primary',
    items: [
      {
        id: 'car-payment',
        lineNumber: 'T1',
        name: 'Vehicle Loan or Lease Payment',
        simpleLabel: 'Monthly car payment',
        description:
          'Your monthly payment for a car loan or lease agreement.',
        examples: [
          'Car loan payment: $425/month',
          'Lease payment: $380/month including taxes',
        ],
        tips: [
          'A reasonable vehicle is considered necessary to get to work',
          'A luxury vehicle payment may be scrutinized — your trustee can advise',
          'If your car is paid off, skip this line',
        ],
      },
      {
        id: 'car-insurance',
        lineNumber: 'T2',
        name: 'Vehicle Insurance',
        simpleLabel: 'Monthly car insurance',
        description:
          'Monthly cost of insuring your vehicle. Divide annual premium by 12 if you pay annually.',
        examples: [
          'Ontario auto insurance: $175/month',
          'BC ICBC insurance: $120/month',
          'Alberta insurance: $150/month',
        ],
        tips: [
          'Vehicle insurance is mandatory in Canada and fully claimable',
          'Include all vehicles you insure, up to what is necessary',
        ],
      },
      {
        id: 'gas-fuel',
        lineNumber: 'T3',
        name: 'Gas / Fuel',
        simpleLabel: 'Gasoline or fuel for your vehicle',
        description:
          'Monthly fuel cost for your vehicle(s). Base this on your actual driving needs for work and essential activities.',
        examples: [
          'Commuting 30km round trip daily: $180/month in gas',
          'Rural resident with long distances: $350/month',
          'Hybrid vehicle: $90/month',
        ],
        tips: [
          'Estimate based on your actual distance driven for essential trips',
          'Include fuel for commuting, medical appointments, grocery shopping, etc.',
          'Rising gas prices are recognized — use your current actual average',
        ],
      },
      {
        id: 'car-maintenance',
        lineNumber: 'T4',
        name: 'Vehicle Maintenance and Repairs',
        simpleLabel: 'Oil changes, tires, and car repairs',
        description:
          'Regular maintenance costs averaged monthly: oil changes, tire rotation, annual inspection, unexpected minor repairs.',
        examples: [
          'Oil change ($80) every 5,000km = ~$160/year = $13/month',
          'Annual tire change (winter/summer): $200/year = $17/month',
          'Average maintenance budget: $100/month for an older vehicle',
        ],
        tips: [
          'Older vehicles typically cost more to maintain — reflect this in your estimate',
          'Average your annual maintenance costs over 12 months',
          'Major repairs can sometimes be claimed in the month they occur',
        ],
      },
      {
        id: 'vehicle-license',
        lineNumber: 'T5',
        name: 'Vehicle Registration and License',
        simpleLabel: 'Annual license plate renewal (monthly average)',
        description:
          'Annual cost to renew your license plates and driver\'s license, divided monthly.',
        examples: [
          'Ontario plate sticker: $120/year = $10/month',
          'BC ICBC registration: varies by vehicle',
        ],
        tips: [
          'Divide your annual registration cost by 12 for monthly amount',
          'Include both vehicle registration and driver\'s license renewal costs',
        ],
      },
      {
        id: 'public-transit',
        lineNumber: 'T6',
        name: 'Public Transit',
        simpleLabel: 'Bus, subway, or train pass',
        description:
          'Monthly cost of public transit passes or tickets for commuting and essential travel.',
        examples: [
          'TTC monthly Presto pass (Toronto): $156/month',
          'OC Transpo (Ottawa) monthly pass: $115/month',
          'STM (Montreal) monthly pass: $97/month',
          'Bus tickets for work: $80/month',
        ],
        tips: [
          'If you don\'t own a car, public transit is your primary transportation — claim fully',
          'A monthly pass is almost always cheaper than individual tickets — compare costs',
        ],
      },
      {
        id: 'parking-tolls',
        lineNumber: 'T7',
        name: 'Parking and Tolls',
        simpleLabel: 'Parking at work or on toll roads',
        description:
          'Monthly parking costs at your workplace, medical appointments, or regularly used toll roads.',
        examples: [
          'Work parking pass: $75/month',
          'Highway 407 tolls (Ontario): $60/month commuter average',
          'Downtown parking for medical appointments: $30/month',
        ],
        tips: [
          'Parking required for work is a legitimate work-related expense',
          'Highway tolls for your commute route are claimable',
        ],
      },
    ],
  },
  {
    id: 'medical',
    title: 'Medical and Healthcare',
    subtitle: 'Health costs not covered by provincial health insurance or employer benefits',
    type: 'expense',
    colorScheme: 'danger',
    items: [
      {
        id: 'medical-expenses',
        lineNumber: 'M1',
        name: 'Medical Expenses (Out-of-Pocket)',
        simpleLabel: 'Doctor, specialist, or clinic visits not covered',
        description:
          'Medical costs not covered by OHIP/provincial health insurance or your employer\'s benefits plan.',
        examples: [
          'Naturopath or chiropractor visit: $80/session × 2/month = $160',
          'Physiotherapy co-pay: $25/session',
          'Out-of-province medical expense',
          'Private medical test or procedure',
        ],
        tips: [
          'List all medical expenses your provincial plan doesn\'t cover',
          'Physiotherapy, massage therapy, and chiropractic care are often partially covered',
          'Keep all receipts — these are non-discretionary if medically necessary',
        ],
      },
      {
        id: 'dental',
        lineNumber: 'M2',
        name: 'Dental Expenses (Out-of-Pocket)',
        simpleLabel: 'Dental care costs not covered by insurance',
        description:
          'Dentist costs not covered by your dental plan or not insured at all.',
        examples: [
          'Cleaning and checkup co-pay: $75/visit',
          'No dental insurance — full checkup: $200/6 months = $33/month average',
          'Emergency tooth extraction: $350 in the month it occurs',
        ],
        tips: [
          'If you have no dental coverage, claim your full dental costs',
          'Average larger procedures across the months you plan for them',
          'Basic dental care is recognized as a necessary health expense',
        ],
      },
      {
        id: 'prescriptions',
        lineNumber: 'M3',
        name: 'Prescription Medications',
        simpleLabel: 'Monthly cost of prescription drugs',
        description:
          'Monthly cost of prescription medications not fully covered by your provincial drug plan or employer\'s benefits.',
        examples: [
          'Blood pressure medication co-pay: $15/month',
          'No drug coverage — insulin and supplies: $200/month',
          'Mental health medications: $80/month',
          'ODB (Ontario Drug Benefit) deductible: $2/prescription',
        ],
        tips: [
          'Claim only the portion YOU pay (after insurance coverage)',
          'If you have no drug plan, claim the full cost of all prescriptions',
          'Insulin, EpiPens, and other life-critical medications are clearly non-discretionary',
        ],
      },
      {
        id: 'vision',
        lineNumber: 'M4',
        name: 'Vision Care / Glasses / Contact Lenses',
        simpleLabel: 'Glasses, contacts, and eye exams',
        description:
          'Costs for vision care not covered by insurance: eye exams (for adults), glasses frames and lenses, contact lenses and solution.',
        examples: [
          'Eye exam (Ontario — not covered for adults): $100 every 2 years = $4/month',
          'New glasses frames and lenses: $300/year = $25/month average',
          'Monthly contact lenses and solution: $45/month',
        ],
        tips: [
          'Vision care for required eyeglasses is a necessary expense — claim it',
          'Average larger costs (like new glasses) across 12 months',
          'Children\'s eye exams are covered by provincial health in most provinces',
        ],
      },
      {
        id: 'mental-health',
        lineNumber: 'M5',
        name: 'Mental Health and Counselling',
        simpleLabel: 'Therapy, counselling, or psychiatry visits',
        description:
          'Costs for psychological counselling, therapy, or psychiatric services not covered by provincial health care.',
        examples: [
          'Private therapist/counsellor: $150/session × 2/month = $300',
          'Psychologist co-pay after insurance: $50/session',
          'Online therapy subscription: $89/month',
        ],
        tips: [
          'Mental health care is a legitimate and important expense — claim it fully',
          'Going through bankruptcy is stressful; mental health support is a genuine need',
          'Some employers cover a portion of counselling through an Employee Assistance Program (EAP)',
        ],
      },
      {
        id: 'other-health',
        lineNumber: 'M6',
        name: 'Other Healthcare Expenses',
        simpleLabel: 'Medical equipment, supplies, or other health costs',
        description:
          'Other medical costs: CPAP supplies, medical equipment rentals, mobility aids, home care, etc.',
        examples: [
          'CPAP machine supplies and masks: $30/month',
          'Diabetic supplies (test strips, lancets): $80/month',
          'Wheelchair maintenance: $20/month',
          'Home care aide for disability: $400/month',
        ],
        tips: [
          'Disability-related costs are strongly supported as non-discretionary',
          'Medical equipment rentals or regular supplies are clearly necessary expenses',
        ],
      },
    ],
  },
  {
    id: 'childcare',
    title: 'Childcare and Family Expenses',
    subtitle: 'Costs related to raising your children',
    type: 'expense',
    colorScheme: 'primary',
    items: [
      {
        id: 'daycare',
        lineNumber: 'C1',
        name: 'Daycare / Childcare',
        simpleLabel: 'Licensed daycare or childminder costs',
        description:
          'Monthly cost of childcare for your children while you work: licensed daycare, home daycare, or nanny.',
        examples: [
          'Licensed daycare (infant): $1,800/month (Ontario)',
          'Home daycare for toddler: $1,100/month',
          'After-school care program: $400/month',
          'Licensed daycare minus CWELCC subsidy (if applicable)',
        ],
        tips: [
          'Childcare to enable you to work is fully non-discretionary',
          'Use the net cost after any government subsidies',
          'The Canada-Wide Early Learning and Child Care (CWELCC) reduces daycare fees in many provinces',
          'Keep childcare receipts — they\'re important for both bankruptcy and tax purposes',
        ],
      },
      {
        id: 'babysitting',
        lineNumber: 'C2',
        name: 'Babysitting / Informal Childcare',
        simpleLabel: 'Babysitter or family member childcare',
        description:
          'Payments to a babysitter, relative, or informal caregiver for childcare while you work or attend medical appointments.',
        examples: [
          'Evening babysitter for work shifts: $200/month',
          'Paying a family member $400/month to watch children',
          'Occasional babysitter: $100/month average',
        ],
        tips: [
          'Document informal childcare arrangements — even cash payments to family count',
          'Keep a record of dates and amounts paid',
        ],
      },
      {
        id: 'school-fees',
        lineNumber: 'C3',
        name: 'School Fees and Supplies',
        simpleLabel: 'School fees, supplies, and field trips',
        description:
          'School-related costs: school fees, backpacks, pencils, textbooks, lunch supplies, and field trips.',
        examples: [
          'Back-to-school supplies: $200/September averaged monthly = $17/month',
          'Monthly school fees or agenda: $10/month',
          'Lunch supplies and school snacks (separate from grocery)',
        ],
        tips: [
          'Average large one-time costs (like back-to-school shopping) across the year',
          'Public school is free but comes with real costs — claim them all',
        ],
      },
      {
        id: 'extracurricular',
        lineNumber: 'C4',
        name: 'Children\'s Activities and Sports',
        simpleLabel: 'Sports, music lessons, and kids\' programs',
        description:
          'Registered activities for your children: hockey, dance, swimming lessons, music lessons, Scouts/Girl Guides, etc.',
        examples: [
          'House league hockey (fees + equipment): $1,200/season = $100/month',
          'Swimming lessons: $80/month',
          'Dance classes: $120/month',
          'Girl Guides membership and camp: $600/year = $50/month',
        ],
        tips: [
          'One organized activity per child is generally considered reasonable',
          'Document all costs including equipment, uniforms, and registration fees',
          'These support the children\'s development and well-being — claim them',
        ],
      },
      {
        id: 'children-clothing',
        lineNumber: 'C5',
        name: 'Children\'s Clothing and Footwear',
        simpleLabel: 'Clothing for your children',
        description:
          'Monthly average for children\'s clothing and shoes. Children grow quickly and need frequent replacement.',
        examples: [
          'Two growing children — clothing average: $120/month',
          'Annual winter coat and boots for 3 kids: $600 = $50/month',
          'School uniform requirements: $40/month averaged',
        ],
        tips: [
          'Children\'s clothing is a fully justified expense — they outgrow everything',
          'Average seasonal purchases (winter gear, school clothes) monthly',
          'Second-hand clothing purchases still count as an expense',
        ],
      },
    ],
  },
  {
    id: 'other',
    title: 'Other Expenses',
    subtitle: 'Any additional regular expenses not covered in the sections above',
    type: 'expense',
    colorScheme: 'neutral',
    items: [
      {
        id: 'student-loans',
        lineNumber: 'O1',
        name: 'Student Loan Payments',
        simpleLabel: 'Government or private student loan payments',
        description:
          'Monthly payment on government student loans (OSAP, NSLSC) or private student loans. Note: Government student loans are typically INCLUDED in your bankruptcy.',
        examples: [
          'NSLSC student loan repayment: $250/month',
          'Private student line of credit: $300/month',
          'Repaying student loans after bankruptcy discharge (if applicable)',
        ],
        tips: [
          'IMPORTANT: Government student loans less than 7 years old are typically discharged in bankruptcy — ask your trustee',
          'Student loans over 7 years old may be discharged — verify with your trustee',
          'Private student lines of credit (from a bank) ARE typically included in bankruptcy',
        ],
      },
      {
        id: 'other-loan-payments',
        lineNumber: 'O2',
        name: 'Other Loan Payments (Not in Bankruptcy)',
        simpleLabel: 'Loans that cannot be included in your bankruptcy',
        description:
          'Monthly payments on loans excluded from your bankruptcy, such as secured loans not being surrendered or court-ordered fines.',
        examples: [
          'Secured car loan where you\'re keeping the car',
          'Court-ordered restitution payments',
          'Mortgage payments (if keeping the property)',
        ],
        tips: [
          'Most unsecured debts are included in your bankruptcy',
          'Secured debts (car, mortgage) remain if you choose to keep the asset',
          'Fines, government overpayments, and fraud-related debts may not be dischargeable',
        ],
      },
      {
        id: 'pet-expenses',
        lineNumber: 'O3',
        name: 'Pet Care',
        simpleLabel: 'Food and vet costs for your pets',
        description:
          'Monthly costs for caring for your pets: food, veterinary care, medications, and grooming.',
        examples: [
          'Dog food and supplies: $80/month',
          'Cat food and litter: $45/month',
          'Monthly pet medication (e.g., heartworm, flea prevention): $25',
          'Annual vet checkup: $200/year = $17/month',
        ],
        tips: [
          'Pet care is a legitimate expense — especially for seniors or those with emotional support animals',
          'A reasonable amount is expected — exotic or luxury pet costs may be questioned',
        ],
      },
      {
        id: 'other-expenses',
        lineNumber: 'O4',
        name: 'Other Regular Expenses',
        simpleLabel: 'Anything else you regularly spend money on',
        description:
          'Any other regular monthly expenses not captured in the sections above.',
        examples: [
          'Storage unit rental: $90/month',
          'Accounting/tax preparation: $300/year = $25/month',
          'Religious school or cultural classes for children: $75/month',
          'Work parking not covered above',
        ],
        tips: [
          'List any expense that is real and recurring',
          'Explain the reason for unusual expenses — context helps your trustee advocate for you',
          'Every legitimate expense you claim reduces your surplus income and your monthly bankruptcy payment',
        ],
      },
    ],
  },
];

export const OSB_THRESHOLDS: Record<number, number> = {
  1: 2409,
  2: 3003,
  3: 3688,
  4: 4479,
  5: 5078,
  6: 5673,
  7: 6281,
};
