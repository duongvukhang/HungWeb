export const navItems = [
    {label: "HOME", to:"/"},

    {label: "SERVICES", to:"/servicesPage"},

    {label: "PRODUCTS", to:"/productsPage", menu: [
        { label: 'Web Apps', to: '/products/web-apps' },
        { label: 'Mobile Apps', to: '/products/mobile-apps' },
        { label: 'Desktop Apps', to: '/products/desktop-apps' }]
    },
    
    {label: "COMPANY PROFILE", to:"/companyProfilePage"},

    {label: "NEWS", to:"/newsPage"},

    {label: "CONTACT", to:"/contactPage"},

]