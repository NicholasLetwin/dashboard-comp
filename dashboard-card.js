/**
 * Copyright 2024 NicholasLetwin
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `dashboard-card`
 * 
 * @demo index.html
 * @element dashboard-card
 */

export class DashboardCard extends LitElement {
    static get properties() {
      return {
        name: { type: String },
        description: { type: String },
        image: { type: String },
        isSelected: { type: Boolean },
      };
    }
  
    static get styles() {
        return css`
          :host {
            display: block;
            max-width: 300px;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            font-family: Arial, sans-serif;
            background-color: white;
          }
    
          :host(:hover) {
            transform: scale(1.01);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
          }
    
          :host([is-selected]) {
            border: 2px solid blue;
            background-color: #f0f8ff;
          }
    
          div {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 15px;
            text-align: center;
          }
    
          img {
            width: 100%;
            height: 180px;
            object-fit: cover;
            border-bottom: 1px solid #ddd;
          }
    
          h3 {
            font-size: 1.2rem;
            margin: 10px 0;
            color: #333;
          }
    
          p {
            font-size: 1rem;
            color: #666;
            margin: 0 0 15px;
          }
    
          button {
            padding: 10px 15px;
            background-color: blue;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 1rem;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
    
          button:hover {
            background-color: darkblue;
          }
    
          button:focus {
            outline: none;
          }
    
        `;
      }


    render() {
      return html`
        <div>
          <img src="${this.image}" alt="${this.name}" />
          <h3>${this.name}</h3>
          <p>${this.description}</p>
          <button @click="${this._handleClick}">
            ${this.isSelected ? "Selected" : "Select"}
          </button>
        </div>
      `;
    }
  
    _handleClick() {
      this.dispatchEvent(new CustomEvent("card-selected", { bubbles: true, composed: true }));
    }
  }
  
  customElements.define("dashboard-card", DashboardCard);
  
    




