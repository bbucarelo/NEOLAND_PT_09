import "./Footer.css";

const template = () => `
<footer>
    <div class="footer-text">
      <h3>© 2023 NEOLAND SCHOOL</h3>
      <p>Política de privacidad | Contacto</p>
    </div>
    <div class="social-icons">
    <a href="https://www.instagram.com/neolandschool/" target="_blank"><img src="https://res.cloudinary.com/ddte4t4qb/image/upload/v1704483701/instagram_1077042_hpsclv.png" alt="Instagram"></a>
    <a href="https://www.linkedin.com/school/neoland/" target="_blank"><img src="https://res.cloudinary.com/ddte4t4qb/image/upload/v1704483701/linkedin_3128219_ctdoqe.png" alt="Linkedin"></a>
    <a href="https://www.youtube.com/@neoland-school" target="_blank"><img src="https://res.cloudinary.com/ddte4t4qb/image/upload/v1704484531/youtube_1077046_dh036m.png" alt="Youtube"></a>
    </div>
  </footer>
`;

export const PrintTemplateFooter = () => {
    document.querySelector("footer").innerHTML = template();
}

