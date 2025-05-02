// Portfolio placeholder cycling
const portfolioSamples = [
    "Sample Project 1: PrikahnFinance dashboard layout mockup",
    "Sample Project 2: Mobile-first landing page concept",
    "Sample Project 3: Business analytics tracking tool"
  ];
  let portfolioIndex = 0;
  function cyclePortfolio(dir) {
    portfolioIndex = (portfolioIndex + dir + portfolioSamples.length) % portfolioSamples.length;
    document.getElementById('portfolio-sample').innerText = portfolioSamples[portfolioIndex];
  }
  
  // Testimonials placeholder cycling
  const testimonials = [
    '"Sample Testimonial 1: Sean helped create a great design for my online presence."',
    '"Sample Testimonial 2: Easy to work with and super helpful!"',
    '"Sample Testimonial 3: Great design, clear communication, and fast delivery."'
  ];
  let testimonialIndex = 0;
  function cycleTestimonial(dir) {
    testimonialIndex = (testimonialIndex + dir + testimonials.length) % testimonials.length;
    document.getElementById('testimonial').innerText = testimonials[testimonialIndex];
  }
  