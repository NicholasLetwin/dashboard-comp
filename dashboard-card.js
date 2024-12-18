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
        demoLink: { type: String },
      };
    }
  
    static get styles() {
        return css`
          :host {
            display: block;
            max-width: 360px; 
            border-radius: var(--ddd-radius-md, 16px);
            overflow: hidden;
            box-shadow: var(--ddd-shadow-md, 0 4px 6px rgba(0, 0, 0, 0.1));
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            font-family: var(--ddd-font-family, Arial, sans-serif);
            background-color: var(--ddd-theme-default-white, #ffffff);
            padding-bottom: var(--ddd-spacing-4, 20px);
            }
    
            :host(:hover) {
                transform: scale(1.02);
                box-shadow: var(--ddd-shadow-lg, 0 6px 12px rgba(0, 0, 0, 0.15));
            }

            :host([is-selected]) {
                border: 2px solid var(--ddd-theme-primary, #003366);
                background-color: var(--ddd-theme-default-muted, #f0f8ff);
            }
    
            div {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: var(--ddd-spacing-4, 20px);
                text-align: center;
            }
    
            img {
                width: 100%;
                height: 200px;
                border-radius: var(--ddd-radius-sm, 8px);
                object-fit: cover;
                border-bottom: 1px solid var(--ddd-theme-default-muted, #ddd);
            }
    
            h3 {
                font-size: var(--ddd-font-size-m, 1.4rem);
                margin: var(--ddd-spacing-2, 10px) 0;
                color: var(--ddd-theme-default-text, #333);
            }

            p {
                font-size: var(--ddd-font-size-s, 1rem);
                color: var(--ddd-theme-default-muted, #666);
                margin: 0 0 var(--ddd-spacing-3, 15px);
            }
    
            button {
                padding: var(--ddd-spacing-2, 10px) var(--ddd-spacing-3, 15px);
                background-color: var(--ddd-theme-primary, #003366);
                color: var(--ddd-theme-default-white, white);
                border: none;
                border-radius: var(--ddd-radius-sm, 4px);
                font-size: var(--ddd-font-size-s, 1rem);
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-top: var(--ddd-spacing-2, 10px);
         }
                    
          button:hover {
            background-color: var(--ddd-theme-primary-dark, #002244);
          }
    
          button:focus {
            outline: none;
          }
    
          .demo-link {
            display: inline-block;
            margin-top: var(--ddd-spacing-2, 10px);
            font-size: var(--ddd-font-size-s, 1rem);
            color: var(--ddd-theme-primary, #003366);
            text-decoration: underline;
            cursor: pointer;
            }

        .demo-link:hover {
            color: var(--ddd-theme-primary-dark, #002244);
            }

        `;
      }


      render() {
        return html`
          <div class="card">
            <img src="${this.image}" alt="${this.name}" />
            <h3>${this.name}</h3>
            <p>${this.description}</p>
            <button @click="${this._handleClick}">
              ${this.isSelected ? "Selected" : "Select"}
            </button>
            ${this.demoLink 
              ? html`
                <a class="demo-link" href="${this.demoLink}" target="_blank" rel="noopener noreferrer">
                  View Demo
                </a>
              ` 
              : ""}
          </div>
        `;
      }
  
    _handleClick() {
      this.dispatchEvent(new CustomEvent("card-selected", { bubbles: true, composed: true }));
    }

    _openDemo() {
        window.open(this.demoUrl, "_blank"); 
      }
    
  }
  
  customElements.define("dashboard-card", DashboardCard);
  
    




