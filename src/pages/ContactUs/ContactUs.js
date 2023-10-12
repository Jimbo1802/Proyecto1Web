// ContactPage.js
import React from 'react';
import './ContactUs.css';
import pikachuImage from './pikachu.png';  // Recuerda agregar una imagen de Pikachu o cualquier otro Pokémon

const ContactUs = () => {
    return (
        <div className="contact-container">
            <h1>¡Contáctanos!</h1>
            <img src={pikachuImage} alt="Pikachu saludando" className="contact-pokemon-img"/>

            <p>¿Tienes alguna pregunta, comentario o sugerencia sobre el mundo Pokémon? ¡Nos encantaría escucharlo! Llena el formulario a continuación y te responderemos lo más pronto posible.</p>

            <form className="contact-form">
                <div className="input-group">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Ej. Ash Ketchum"/>
                </div>
                <div className="input-group">
                    <label>Email:</label>
                    <input type="email" placeholder="Ej. ash@pokedex.com"/>
                </div>
                <div className="input-group">
                    <label>Mensaje:</label>
                    <textarea placeholder="Escribe tu mensaje aquí..."></textarea>
                </div>
                <button type="submit" className="submit-button">Enviar</button>
            </form>
        </div>
    );
}

export default ContactUs;


