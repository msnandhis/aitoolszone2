import{u,j as e,s as t}from"./pages-admin-BOA_oIiy.js";import{u as y,L as r,r as c}from"./vendor-react-DGC9jAcQ.js";import{e as g,n as p,o as f,h as b,M as j,p as N,S as v}from"./vendor-ui-8zkSVza8.js";function w(){const s=y(),{user:l}=u(),i=a=>s.pathname===a;return e.jsx("header",{className:"bg-white border-b border-gray-200 sticky top-0 z-50",children:e.jsxs("div",{className:`${t.container} py-4`,children:[e.jsxs("nav",{className:"flex items-center justify-between",children:[e.jsx(r,{to:"/",className:"flex items-center gap-2",children:e.jsx("img",{src:"/logo.svg",alt:"AI Tools Directory",className:"h-8"})}),e.jsxs("div",{className:"hidden md:flex items-center gap-8",children:[e.jsx(r,{to:"/",className:`text-sm font-medium ${i("/")?"text-[#FF5722]":"text-gray-600 hover:text-gray-900"}`,children:"Tools"}),e.jsx(r,{to:"/about",className:`text-sm font-medium ${i("/about")?"text-[#FF5722]":"text-gray-600 hover:text-gray-900"}`,children:"About"}),e.jsx(r,{to:"/contact",className:`text-sm font-medium ${i("/contact")?"text-[#FF5722]":"text-gray-600 hover:text-gray-900"}`,children:"Contact"}),l&&e.jsx(r,{to:"/admin/dashboard",className:`text-sm font-medium ${s.pathname.startsWith("/admin")?"text-[#FF5722]":"text-gray-600 hover:text-gray-900"}`,children:"Admin"}),e.jsx("button",{onClick:()=>{const a=document.getElementById("submit-modal");a instanceof HTMLDialogElement&&a.showModal()},className:"px-4 py-2 text-sm font-medium text-white bg-[#FF5722] rounded-lg hover:bg-[#F4511E] transition-colors",children:"Submit Tool"})]}),e.jsxs("div",{className:"md:hidden flex items-center gap-4",children:[e.jsx("button",{onClick:()=>{const a=document.getElementById("submit-modal");a instanceof HTMLDialogElement&&a.showModal()},className:"px-4 py-2 text-sm font-medium text-white bg-[#FF5722] rounded-lg hover:bg-[#F4511E] transition-colors",children:"Submit Tool"}),e.jsx("button",{onClick:()=>{const a=document.getElementById("mobile-menu");a&&a.classList.toggle("hidden")},className:"p-2 text-gray-600 hover:text-gray-900",children:e.jsx("svg",{className:"w-6 h-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 6h16M4 12h16M4 18h16"})})})]})]}),e.jsx("div",{id:"mobile-menu",className:"hidden md:hidden py-4",children:e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(r,{to:"/",className:`text-sm font-medium ${i("/")?"text-[#FF5722]":"text-gray-600"}`,children:"Tools"}),e.jsx(r,{to:"/about",className:`text-sm font-medium ${i("/about")?"text-[#FF5722]":"text-gray-600"}`,children:"About"}),e.jsx(r,{to:"/contact",className:`text-sm font-medium ${i("/contact")?"text-[#FF5722]":"text-gray-600"}`,children:"Contact"}),l&&e.jsx(r,{to:"/admin/dashboard",className:`text-sm font-medium ${s.pathname.startsWith("/admin")?"text-[#FF5722]":"text-gray-600"}`,children:"Admin"})]})})]})})}function A(){const s=new Date().getFullYear();return e.jsx("footer",{className:"bg-white border-t border-gray-200",children:e.jsx("div",{className:`${t.container} py-6`,children:e.jsxs("div",{className:"flex flex-col sm:flex-row items-center justify-between gap-4",children:[e.jsxs("div",{className:"text-sm text-gray-500",children:["© ",s," AIToolsZone.com. All rights reserved."]}),e.jsxs("div",{className:"flex items-center gap-6",children:[e.jsx(r,{to:"/about",className:"text-sm text-gray-500 hover:text-[#FF5722]",children:"About"}),e.jsx(r,{to:"/contact",className:"text-sm text-gray-500 hover:text-[#FF5722]",children:"Contact"}),e.jsx(r,{to:"/terms",className:"text-sm text-gray-500 hover:text-[#FF5722]",children:"Terms & Conditions"}),e.jsx(r,{to:"/privacy",className:"text-sm text-gray-500 hover:text-[#FF5722]",children:"Privacy Policy"})]})]})})})}function d({children:s}){return e.jsxs("div",{className:"flex flex-col min-h-screen",children:[e.jsx(w,{}),e.jsx("main",{className:"flex-grow",children:s}),e.jsx(A,{})]})}function S(){return c.useEffect(()=>{document.title="About AI Tools Directory - Discover the Best AI Tools and APIs";const s=document.querySelector('meta[name="description"]');s&&s.setAttribute("content","Discover the most comprehensive directory of AI tools, APIs, and services. Find and compare the best artificial intelligence solutions for your needs.")},[]),e.jsx(d,{children:e.jsxs("div",{className:"bg-white",children:[e.jsx("div",{className:"bg-gradient-to-b from-primary-50 to-white",children:e.jsxs("div",{className:`${t.container} py-16 lg:py-24`,children:[e.jsx("h1",{className:"text-4xl lg:text-5xl font-display font-bold text-gray-900 text-center mb-6",children:"Discover the Future of AI"}),e.jsx("p",{className:"text-xl text-gray-600 text-center max-w-3xl mx-auto",children:"AI Tools Directory is your comprehensive resource for discovering, comparing, and implementing artificial intelligence solutions. We curate the best AI tools and APIs to help you build smarter applications."})]})}),e.jsx("div",{className:`${t.container} py-16 lg:py-24`,children:e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12",children:[e.jsxs("div",{className:"flex flex-col items-center text-center p-6",children:[e.jsx("div",{className:"w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mb-6",children:e.jsx(g,{className:"w-8 h-8 text-primary-500"})}),e.jsx("h3",{className:"text-xl font-display font-semibold text-gray-900 mb-4",children:"Easy Discovery"}),e.jsx("p",{className:"text-gray-600",children:"Find the perfect AI tools for your needs with our intuitive search and filtering system. Compare features, pricing, and capabilities at a glance."})]}),e.jsxs("div",{className:"flex flex-col items-center text-center p-6",children:[e.jsx("div",{className:"w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mb-6",children:e.jsx(p,{className:"w-8 h-8 text-primary-500"})}),e.jsx("h3",{className:"text-xl font-display font-semibold text-gray-900 mb-4",children:"Curated Selection"}),e.jsx("p",{className:"text-gray-600",children:"We carefully review and verify each AI tool to ensure quality and reliability. Our directory features only the best solutions in the market."})]}),e.jsxs("div",{className:"flex flex-col items-center text-center p-6",children:[e.jsx("div",{className:"w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mb-6",children:e.jsx(f,{className:"w-8 h-8 text-primary-500"})}),e.jsx("h3",{className:"text-xl font-display font-semibold text-gray-900 mb-4",children:"Trusted Reviews"}),e.jsx("p",{className:"text-gray-600",children:"Make informed decisions with real user reviews and detailed analysis of each tool's performance and capabilities."})]})]})}),e.jsx("div",{className:"bg-gray-50",children:e.jsxs("div",{className:`${t.container} py-16 lg:py-24`,children:[e.jsx("h2",{className:"text-3xl font-display font-bold text-gray-900 text-center mb-12",children:"Explore AI Categories"}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",children:["Text Generation","Image Generation","Voice & Speech","Data Analysis","Code Generation","Video Generation","Chat & Conversation","Machine Learning"].map(s=>e.jsxs("div",{className:"bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200",children:[e.jsx("h3",{className:"font-display font-semibold text-gray-900 mb-2",children:s}),e.jsxs("p",{className:"text-sm text-gray-600",children:["Discover top ",s.toLowerCase()," tools and APIs"]})]},s))})]})}),e.jsx("div",{className:`${t.container} py-16 lg:py-24`,children:e.jsxs("div",{className:"max-w-3xl mx-auto text-center",children:[e.jsx("h2",{className:"text-3xl font-display font-bold text-gray-900 mb-6",children:"Our Mission"}),e.jsx("p",{className:"text-lg text-gray-600 mb-8",children:"We're dedicated to making artificial intelligence accessible to everyone. Our platform helps developers, businesses, and innovators find and implement the right AI solutions to power their next breakthrough."}),e.jsxs("div",{className:"flex flex-col sm:flex-row items-center justify-center gap-4",children:[e.jsx("button",{className:`${t.button.base} ${t.button.primary} ${t.button.sizes.lg}`,children:"Browse AI Tools"}),e.jsx("button",{className:`${t.button.base} ${t.button.secondary} ${t.button.sizes.lg}`,children:"Submit Your Tool"})]})]})})]})})}function C(){const[s,l]=c.useState({name:"",email:"",message:""}),[i,a]=c.useState(!1),[m,x]=c.useState(!1),h=async o=>{o.preventDefault(),a(!0);try{await new Promise(n=>setTimeout(n,1e3)),x(!0),l({name:"",email:"",message:""})}catch(n){console.error("Error submitting form:",n)}finally{a(!1)}};return e.jsx(d,{children:e.jsx("div",{className:"bg-white",children:e.jsx("div",{className:`${t.container} py-16 lg:py-24`,children:e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24",children:[e.jsxs("div",{children:[e.jsx("h1",{className:`${t.heading.h1} text-gray-900 mb-6`,children:"Get in Touch"}),e.jsx("p",{className:"text-lg text-gray-600 mb-8",children:"Have questions about our platform? Want to submit an API? We'd love to hear from you. Send us a message and we'll respond as soon as possible."}),e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"flex items-start gap-4",children:[e.jsx("div",{className:"flex-shrink-0 w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center",children:e.jsx(b,{className:"w-6 h-6 text-primary-500"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-display text-lg font-semibold text-gray-900 mb-1",children:"Email Us"}),e.jsx("p",{className:"text-gray-600 mb-2",children:"For general inquiries and support"}),e.jsx("a",{href:"mailto:hello@aiapikit.com",className:"text-primary-600 hover:text-primary-700",children:"hello@aiapikit.com"})]})]}),e.jsxs("div",{className:"flex items-start gap-4",children:[e.jsx("div",{className:"flex-shrink-0 w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center",children:e.jsx(j,{className:"w-6 h-6 text-primary-500"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-display text-lg font-semibold text-gray-900 mb-1",children:"Join Our Community"}),e.jsx("p",{className:"text-gray-600 mb-2",children:"Connect with other developers"}),e.jsx("a",{href:"https://discord.gg/aiapikit",className:"text-primary-600 hover:text-primary-700",children:"Discord Community"})]})]}),e.jsxs("div",{className:"flex items-start gap-4",children:[e.jsx("div",{className:"flex-shrink-0 w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center",children:e.jsx(N,{className:"w-6 h-6 text-primary-500"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-display text-lg font-semibold text-gray-900 mb-1",children:"Location"}),e.jsxs("p",{className:"text-gray-600",children:["San Francisco, CA",e.jsx("br",{}),"United States"]})]})]})]})]}),e.jsx("div",{children:e.jsxs("div",{className:"bg-gray-50 rounded-2xl border border-gray-200 p-8",children:[e.jsx("h2",{className:"font-display text-2xl font-semibold text-gray-900 mb-6",children:"Send us a message"}),m?e.jsxs("div",{className:"bg-green-50 border border-green-200 rounded-xl p-6 text-center",children:[e.jsx("h3",{className:"font-display text-lg font-semibold text-green-800 mb-2",children:"Message Sent!"}),e.jsx("p",{className:"text-green-700",children:"Thank you for your message. We'll get back to you soon."})]}):e.jsxs("form",{onSubmit:h,className:"space-y-6",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"name",className:"block text-sm font-medium text-gray-700 mb-1",children:"Name"}),e.jsx("input",{type:"text",id:"name",required:!0,value:s.name,onChange:o=>l(n=>({...n,name:o.target.value})),className:`w-full px-4 py-2 border border-gray-200 rounded-lg
                                focus:ring-2 focus:ring-primary-100 focus:border-primary-500`})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"email",className:"block text-sm font-medium text-gray-700 mb-1",children:"Email"}),e.jsx("input",{type:"email",id:"email",required:!0,value:s.email,onChange:o=>l(n=>({...n,email:o.target.value})),className:`w-full px-4 py-2 border border-gray-200 rounded-lg
                                focus:ring-2 focus:ring-primary-100 focus:border-primary-500`})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"message",className:"block text-sm font-medium text-gray-700 mb-1",children:"Message"}),e.jsx("textarea",{id:"message",required:!0,rows:4,value:s.message,onChange:o=>l(n=>({...n,message:o.target.value})),className:`w-full px-4 py-2 border border-gray-200 rounded-lg
                                focus:ring-2 focus:ring-primary-100 focus:border-primary-500`})]}),e.jsx("button",{type:"submit",disabled:i,className:`${t.button.base} ${t.button.primary} ${t.button.sizes.lg}
                                w-full flex items-center justify-center gap-2`,children:i?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"animate-spin rounded-full h-5 w-5 border-b-2 border-white"}),"Sending..."]}):e.jsxs(e.Fragment,{children:[e.jsx(v,{className:"w-5 h-5"}),"Send Message"]})})]})]})})]})})})})}function P(){return c.useEffect(()=>{document.title="Privacy Policy - AI Tools Directory";const s=document.querySelector('meta[name="description"]');s&&s.setAttribute("content","Privacy Policy for AI Tools Directory. Learn how we collect, use, and protect your personal information.")},[]),e.jsx(d,{children:e.jsx("div",{className:`${t.container} py-12 lg:py-16`,children:e.jsxs("article",{className:"prose prose-lg max-w-3xl mx-auto",children:[e.jsx("h1",{className:`${t.heading.h1} text-gray-900 mb-6`,children:" Privacy Policy "}),e.jsx("p",{className:"text-gray-600 mb-8",children:"Last updated: January 1, 2025"}),e.jsxs("section",{className:"mb-12",children:[e.jsx("h2",{className:"font-display text-2xl font-semibold text-gray-900 mb-4",children:"Introduction"}),e.jsx("p",{className:"text-gray-600 mb-4",children:'AI Tools Directory ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.'}),e.jsx("p",{className:"text-gray-600",children:"Please read this Privacy Policy carefully. By accessing and using our platform, you acknowledge that you have read, understood, and agree to be bound by all terms of this Privacy Policy."})]}),e.jsxs("section",{className:"mb-12",children:[e.jsx("h2",{className:"font-display text-2xl font-semibold text-gray-900 mb-4",children:"Information We Collect"}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"font-display text-xl font-medium text-gray-900",children:"Personal Information"}),e.jsx("p",{className:"text-gray-600",children:"We may collect personal information that you voluntarily provide when using our platform, including:"}),e.jsxs("ul",{className:"list-disc pl-6 text-gray-600 space-y-2",children:[e.jsx("li",{children:"Name and email address when submitting tools or contacting us"}),e.jsx("li",{children:"Account information if you create an account"}),e.jsx("li",{children:"Usage data and preferences"}),e.jsx("li",{children:"Communication history with our team"})]})]})]}),e.jsxs("section",{className:"mb-12",children:[e.jsx("h2",{className:"font-display text-2xl font-semibold text-gray-900 mb-4",children:"How We Use Your Information"}),e.jsx("p",{className:"text-gray-600 mb-4",children:"We use the information we collect for various purposes, including:"}),e.jsxs("ul",{className:"list-disc pl-6 text-gray-600 space-y-2",children:[e.jsx("li",{children:"Providing and maintaining our platform"}),e.jsx("li",{children:"Improving user experience"}),e.jsx("li",{children:"Communicating with you about updates and changes"}),e.jsx("li",{children:"Analyzing usage patterns and trends"}),e.jsx("li",{children:"Preventing fraud and ensuring platform security"})]})]}),e.jsxs("section",{className:"mb-12",children:[e.jsx("h2",{className:"font-display text-2xl font-semibold text-gray-900 mb-4",children:"Information Sharing"}),e.jsx("p",{className:"text-gray-600 mb-4",children:"We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described below:"}),e.jsxs("ul",{className:"list-disc pl-6 text-gray-600 space-y-2",children:[e.jsx("li",{children:"Service providers who assist in operating our platform"}),e.jsx("li",{children:"Legal requirements and law enforcement requests"}),e.jsx("li",{children:"Protection of our rights, privacy, safety, or property"})]})]}),e.jsxs("section",{className:"mb-12",children:[e.jsx("h2",{className:"font-display text-2xl font-semibold text-gray-900 mb-4",children:"Security Measures"}),e.jsx("p",{className:"text-gray-600",children:"We implement appropriate technical and organizational security measures to protect your personal information. However, please note that no method of transmission over the internet or electronic storage is 100% secure."})]}),e.jsxs("section",{className:"mb-12",children:[e.jsx("h2",{className:"font-display text-2xl font-semibold text-gray-900 mb-4",children:"Your Rights"}),e.jsx("p",{className:"text-gray-600 mb-4",children:"You have certain rights regarding your personal information, including:"}),e.jsxs("ul",{className:"list-disc pl-6 text-gray-600 space-y-2",children:[e.jsx("li",{children:"Access to your personal information"}),e.jsx("li",{children:"Correction of inaccurate information"}),e.jsx("li",{children:"Deletion of your information"}),e.jsx("li",{children:"Withdrawal of consent"}),e.jsx("li",{children:"Data portability"})]})]}),e.jsxs("section",{className:"mb-12",children:[e.jsx("h2",{className:"font-display text-2xl font-semibold text-gray-900 mb-4",children:"Contact Us"}),e.jsx("p",{className:"text-gray-600",children:"If you have any questions about this Privacy Policy or our practices, please contact us at:"}),e.jsx("div",{className:"mt-4 p-4 bg-gray-50 rounded-lg",children:e.jsxs("p",{className:"text-gray-600",children:["Email: privacy@aitoolsdirectory.com",e.jsx("br",{}),"Address: 123 AI Street, Tech City, TC 12345"]})})]})]})})})}function k(){return c.useEffect(()=>{document.title="Terms of Service - AI Tools Directory";const s=document.querySelector('meta[name="description"]');s&&s.setAttribute("content","Terms of Service for AI Tools Directory. Read our terms and conditions for using our AI tools and services directory.")},[]),e.jsx(d,{children:e.jsx("div",{className:`${t.container} py-12 lg:py-16`,children:e.jsxs("article",{className:"prose prose-lg max-w-3xl mx-auto",children:[e.jsx("h1",{className:`${t.heading.h1} text-gray-900 mb-6`,children:" Terms & Conditions "}),e.jsx("p",{className:"text-gray-600 mb-8",children:"Last updated: January 1, 2025"}),e.jsxs("section",{className:"mb-12",children:[e.jsx("h2",{className:"font-display text-2xl font-semibold text-gray-900 mb-4",children:"Agreement to Terms"}),e.jsx("p",{className:"text-gray-600",children:"By accessing and using AI Tools Directory, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform."})]}),e.jsxs("section",{className:"mb-12",children:[e.jsx("h2",{className:"font-display text-2xl font-semibold text-gray-900 mb-4",children:"Use License"}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("p",{className:"text-gray-600",children:"Permission is granted to temporarily access the materials (information and software) on AI Tools Directory for personal, non-commercial viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:"}),e.jsxs("ul",{className:"list-disc pl-6 text-gray-600 space-y-2",children:[e.jsx("li",{children:"Modify or copy the materials"}),e.jsx("li",{children:"Use the materials for any commercial purpose"}),e.jsx("li",{children:"Attempt to decompile or reverse engineer any software"}),e.jsx("li",{children:"Remove any copyright or proprietary notations"}),e.jsx("li",{children:"Transfer the materials to another person"})]})]})]}),e.jsxs("section",{className:"mb-12",children:[e.jsx("h2",{className:"font-display text-2xl font-semibold text-gray-900 mb-4",children:"User Submissions"}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("p",{className:"text-gray-600",children:"When submitting tools or content to our platform:"}),e.jsxs("ul",{className:"list-disc pl-6 text-gray-600 space-y-2",children:[e.jsx("li",{children:"You must have the right to submit the content"}),e.jsx("li",{children:"Content must be accurate and not misleading"}),e.jsx("li",{children:"You grant us the right to display and promote the content"}),e.jsx("li",{children:"We reserve the right to remove content at our discretion"})]})]})]}),e.jsxs("section",{className:"mb-12",children:[e.jsx("h2",{className:"font-display text-2xl font-semibold text-gray-900 mb-4",children:"Disclaimer"}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("p",{className:"text-gray-600",children:"The materials on AI Tools Directory are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation:"}),e.jsxs("ul",{className:"list-disc pl-6 text-gray-600 space-y-2",children:[e.jsx("li",{children:"Implied warranties of merchantability"}),e.jsx("li",{children:"Fitness for a particular purpose"}),e.jsx("li",{children:"Non-infringement of intellectual property"}),e.jsx("li",{children:"Accuracy, reliability, and availability of the content"})]})]})]}),e.jsxs("section",{className:"mb-12",children:[e.jsx("h2",{className:"font-display text-2xl font-semibold text-gray-900 mb-4",children:"Limitations"}),e.jsx("p",{className:"text-gray-600",children:"In no event shall AI Tools Directory or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our platform."})]}),e.jsxs("section",{className:"mb-12",children:[e.jsx("h2",{className:"font-display text-2xl font-semibold text-gray-900 mb-4",children:"Revisions and Errata"}),e.jsx("p",{className:"text-gray-600",children:"The materials appearing on AI Tools Directory could include technical, typographical, or photographic errors. We do not warrant that any of the materials are accurate, complete, or current. We may make changes to the materials at any time without notice."})]}),e.jsxs("section",{className:"mb-12",children:[e.jsx("h2",{className:"font-display text-2xl font-semibold text-gray-900 mb-4",children:"Links"}),e.jsx("p",{className:"text-gray-600",children:"We have not reviewed all of the sites linked to our platform and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by AI Tools Directory. Use of any such linked website is at the user's own risk."})]}),e.jsxs("section",{className:"mb-12",children:[e.jsx("h2",{className:"font-display text-2xl font-semibold text-gray-900 mb-4",children:"Governing Law"}),e.jsx("p",{className:"text-gray-600",children:"These terms and conditions are governed by and construed in accordance with the laws, and you irrevocably submit to the exclusive jurisdiction of the courts in that location."})]}),e.jsxs("section",{className:"mb-12",children:[e.jsx("h2",{className:"font-display text-2xl font-semibold text-gray-900 mb-4",children:"Contact Information"}),e.jsx("p",{className:"text-gray-600",children:"If you have any questions about these Terms of Service, please contact us at:"}),e.jsx("div",{className:"mt-4 p-4 bg-gray-50 rounded-lg",children:e.jsxs("p",{className:"text-gray-600",children:["Email: terms@aitoolsdirectory.com",e.jsx("br",{}),"Address: 123 AI Street, Tech City, TC 12345"]})})]})]})})})}export{S as A,C,d as M,P,k as T};
//# sourceMappingURL=pages-static-BmzWBppp.js.map
