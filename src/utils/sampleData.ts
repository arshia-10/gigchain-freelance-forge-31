
// Sample data for testing the client dashboard functionality

export const initializeSampleData = () => {
  // Sample client jobs with enhanced data
  const sampleClientJobs = [
    {
      id: 1,
      title: "E-commerce Website Development",
      description: "Build a modern e-commerce platform with React and Node.js. Need full shopping cart functionality, payment integration, and admin dashboard. Should be mobile-responsive and SEO-optimized.",
      budget: "5000",
      deadline: "2024-02-15",
      category: "web-development",
      skills: ["React", "Node.js", "MongoDB", "Payment Integration", "Stripe"],
      experienceLevel: "intermediate",
      status: "in_progress",
      postedDate: "2024-01-10T10:00:00Z",
      selectedWorker: "alex.eth",
      contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
      escrowAmount: "5000",
      startDate: "2024-01-15T09:00:00Z"
    },
    {
      id: 2,
      title: "Mobile App UI/UX Design",
      description: "Design a modern mobile app interface for fitness tracking. Need wireframes, mockups, and interactive prototypes. Focus on user-friendly navigation and modern design trends.",
      budget: "2500",
      deadline: "2024-01-25",
      category: "design",
      skills: ["Figma", "UI/UX", "Mobile Design", "Prototyping", "User Research"],
      experienceLevel: "expert",
      status: "completed",
      postedDate: "2024-01-05T14:30:00Z",
      selectedWorker: "sarah.eth",
      contractAddress: "0x2345678901bcdef23456789012cdef345678901b",
      escrowAmount: "2500",
      completedDate: "2024-01-20T16:45:00Z",
      startDate: "2024-01-08T10:00:00Z",
      rated: true
    },
    {
      id: 3,
      title: "Smart Contract Development",
      description: "Develop smart contracts for NFT marketplace with minting, trading, and royalty features. Need gas optimization and security audit.",
      budget: "8000",
      deadline: "2024-03-01",
      category: "blockchain",
      skills: ["Solidity", "Web3.js", "Smart Contracts", "DeFi", "OpenZeppelin"],
      experienceLevel: "expert",
      status: "active",
      postedDate: "2024-01-12T09:15:00Z",
      contractAddress: "0x3456789012cdef456789013def4567890234cdef",
      escrowAmount: "8000"
    },
    {
      id: 4,
      title: "Data Analysis Dashboard",
      description: "Create an interactive dashboard for sales data visualization using Python and machine learning for predictive analytics.",
      budget: "3500",
      deadline: "2024-02-20",
      category: "data-science",
      skills: ["Python", "Pandas", "Plotly", "Machine Learning", "SQL"],
      experienceLevel: "intermediate",
      status: "active",
      postedDate: "2024-01-14T11:30:00Z",
      contractAddress: "0x4567890123def567890124def567890345def67",
      escrowAmount: "3500"
    },
    {
      id: 5,
      title: "Content Writing for Tech Blog",
      description: "Write 10 high-quality articles about emerging technologies, each 1500+ words with SEO optimization and proper research.",
      budget: "1200",
      deadline: "2024-02-10",
      category: "writing",
      skills: ["Content Writing", "SEO", "Tech Writing", "Research"],
      experienceLevel: "beginner",
      status: "disputed",
      postedDate: "2024-01-08T16:20:00Z",
      selectedWorker: "mike.eth",
      contractAddress: "0x567890234ef67890235ef67890456ef78901234",
      escrowAmount: "1200",
      startDate: "2024-01-10T08:00:00Z",
      disputeDate: "2024-01-18T14:30:00Z",
      disputeReason: "Content quality not meeting requirements"
    }
  ];

  // Enhanced sample applications
  const sampleApplications = [
    {
      name: "john.eth",
      skills: ["React", "Node.js", "AWS", "Docker"],
      rating: 4.9,
      bid: "$4,800",
      gigId: 3,
      appliedDate: "2024-01-13T11:20:00Z",
      coverLetter: "I have 5+ years of blockchain development experience and have built similar NFT marketplaces."
    },
    {
      name: "emma.eth",
      skills: ["Solidity", "Web3.js", "DeFi", "Security Auditing"],
      rating: 4.8,
      bid: "$7,500",
      gigId: 3,
      appliedDate: "2024-01-13T15:45:00Z",
      coverLetter: "Specialized in smart contract security with 50+ audits completed."
    },
    {
      name: "david.eth",
      skills: ["Python", "Data Science", "Machine Learning", "Visualization"],
      rating: 4.7,
      bid: "$3,200",
      gigId: 4,
      appliedDate: "2024-01-14T08:30:00Z",
      coverLetter: "Expert in creating interactive dashboards with 3+ years experience in fintech analytics."
    },
    {
      name: "lisa.eth",
      skills: ["Content Writing", "SEO", "Technical Writing"],
      rating: 4.6,
      bid: "$1,000",
      gigId: 5,
      appliedDate: "2024-01-15T10:15:00Z",
      coverLetter: "Published 200+ tech articles with proven SEO results and engagement metrics."
    },
    {
      name: "robert.eth",
      skills: ["Blockchain", "Solidity", "DeFi", "Web3"],
      rating: 5.0,
      bid: "$7,800",
      gigId: 3,
      appliedDate: "2024-01-16T09:45:00Z",
      coverLetter: "Leading blockchain architect with experience in building top DeFi protocols."
    },
    {
      name: "anna.eth",
      skills: ["Python", "ML", "Data Visualization", "Statistics"],
      rating: 4.9,
      bid: "$3,400",
      gigId: 4,
      appliedDate: "2024-01-17T14:20:00Z",
      coverLetter: "PhD in Data Science with expertise in predictive modeling and business intelligence."
    }
  ];

  // Initialize data if not exists
  if (!localStorage.getItem('clientJobs')) {
    localStorage.setItem('clientJobs', JSON.stringify(sampleClientJobs));
  }
  
  if (!localStorage.getItem('gigApplications')) {
    localStorage.setItem('gigApplications', JSON.stringify(sampleApplications));
  }

  // Enhanced sample worker ratings
  const sampleRatings = [
    {
      worker: "sarah.eth",
      rating: 5,
      client: "current_client",
      gigTitle: "Mobile App UI/UX Design",
      date: "2024-01-20T18:00:00Z",
      review: "Excellent work, delivered on time with great attention to detail. The designs were exactly what we needed and the communication was perfect throughout the project."
    },
    {
      worker: "alex.eth",
      rating: 4,
      client: "current_client",
      gigTitle: "Previous Web Development",
      date: "2024-01-10T16:30:00Z",
      review: "Good technical skills and delivered quality code. Could improve on communication frequency."
    }
  ];

  if (!localStorage.getItem('workerRatings')) {
    localStorage.setItem('workerRatings', JSON.stringify(sampleRatings));
  }

  // Sample payment history for the payments page
  const samplePayments = [
    {
      id: 1,
      gigTitle: "Mobile App UI/UX Design",
      worker: "sarah.eth",
      amount: 2500,
      status: "completed",
      date: "2024-01-20T16:45:00Z",
      transactionHash: "0xabcdef1234567890abcdef1234567890abcdef12",
      type: "escrow_release"
    },
    {
      id: 2,
      gigTitle: "E-commerce Website Development",
      worker: "alex.eth",
      amount: 5000,
      status: "escrowed",
      date: "2024-01-15T09:00:00Z",
      transactionHash: "0xfedcba0987654321fedcba0987654321fedcba09",
      type: "escrow_deposit"
    }
  ];

  if (!localStorage.getItem('paymentHistory')) {
    localStorage.setItem('paymentHistory', JSON.stringify(samplePayments));
  }

  // Sample credentials issued
  const sampleCredentials = [
    {
      id: 1,
      worker: "sarah.eth",
      skill: "UI/UX Design",
      level: "Expert",
      issueDate: "2024-01-20T18:30:00Z",
      credentialHash: "0x123abc456def789abc123def456abc789def123a",
      gigCompleted: "Mobile App UI/UX Design"
    }
  ];

  if (!localStorage.getItem('issuedCredentials')) {
    localStorage.setItem('issuedCredentials', JSON.stringify(sampleCredentials));
  }
};

export const clearSampleData = () => {
  localStorage.removeItem('clientJobs');
  localStorage.removeItem('gigApplications');
  localStorage.removeItem('workerRatings');
  localStorage.removeItem('paymentHistory');
  localStorage.removeItem('issuedCredentials');
};
