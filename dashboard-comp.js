/**
 * Copyright 2024 NicholasLetwin
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./dashboard-card.js";

/**
 * `dashboard-comp`
 * 
 * @demo index.html
 * @element dashboard-comp
 */
export class DashboardComp extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "dashboard-comp";
  }

  
  constructor() {
    super();
    this.useCaseData = [];
    this.filteredData = [];
    this.activeFilters = [];
    this.activeSearch = "";
    this.activeUseCase = null;
  }

  

 static get properties() {
    return {
      useCaseData: { type: Array },
      filteredData: { type: Array },
      activeFilters: { type: Array },
      activeSearch: { type: String },
      activeUseCase: { type: String },
    };
  }


  firstUpdated() {
    fetch(new URL('./lib/use-case.json', import.meta.url))
  .then((response) => response.json())
  .then((data) => {
    this.useCaseData = data.data;
    this.filteredData = [...this.useCaseData];
  });
  }

  handleSearch(event) {
    this.activeSearch = event.target.value.toLowerCase();
    this.updateFilteredData();
  }

  toggleFilter(filter) {
    if (this.activeFilters.includes(filter)) {
      this.activeFilters = this.activeFilters.filter((f) => f !== filter);
    } else {
      this.activeFilters = [...this.activeFilters, filter];
    }
    this.updateFilteredData();
  }
  updateFilteredData() {
    this.filteredData = this.useCaseData.filter((item) => {
      const matchesSearch =
        this.activeSearch === "" ||
        item.name.toLowerCase().includes(this.activeSearch) ||
        item.description.toLowerCase().includes(this.activeSearch);

      const matchesFilter =
        this.activeFilters.length === 0 ||
        item.tags.some((tag) => this.activeFilters.includes(tag));

      return matchesSearch && matchesFilter;
    });
  }

  

  filterData(tag) {
    this.filteredData = this.useCaseData.filter((item) => item.tags.includes(tag));
    this.requestUpdate();
  }

  resetFilter() {
    this.activeFilters = [];
    const checkboxes = this.shadowRoot.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

    this.filteredData = [...this.useCaseData];
    this.requestUpdate();
  }

  // sortData(sortBy) {
  //   this.filteredData.sort((a, b) => 
  //     sortBy === 'date' ? a.dateAdded - b.dateAdded : a.name.localeCompare(b.name)
  //   );
  // }

  selectUseCase(useCaseName) {
    this.activeUseCase = this.activeUseCase === useCaseName ? null : useCaseName;
  }


  continue() {
    alert(`Selected Use Case: ${this.selectedUseCase}`);
  }


  // Lit scoped styles
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        font-family: var(--ddd-font-family, Arial, sans-serif);
        background-color: var(--ddd-theme-default-white, #f5f5f5);
        color: var(--ddd-theme-default-text, #333);
        padding: var(--ddd-spacing-5, 20px);
        gap: var(--ddd-spacing-5, 20px);
      }
  
      .header {
        background-color: var(--ddd-theme-primary, #003366);
        color: var(--ddd-theme-default-white, white);
        padding: var(--ddd-spacing-4, 15px) var(--ddd-spacing-5, 20px);
        border-radius: var(--ddd-radius-md, 8px);
        margin-bottom: var(--ddd-spacing-5, 20px);
      }
  
      .header h1 {
        font-size: var(--ddd-font-size-l, 1.5rem);
        margin: 0;
      }

      .header p {
        font-size: var(--ddd-font-size-m, 1rem);
        margin: 0;
        color: var(--ddd-theme-default-muted, #e6e6e6);
      }
  
      .search-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--ddd-spacing-5, 20px);
      }

      .sidebar {
  width: 250px;
  padding: var(--ddd-spacing-5, 20px);
  background-color: var(--ddd-theme-default-white, #f8f8f8);
  border: var(--ddd-border-xs, 1px solid #ddd);
  border-radius: var(--ddd-radius-md, 8px);
  display: flex;
  flex-direction: column;
  gap: var(--ddd-spacing-4, 15px);
}

.sidebar h3 {
  margin: 0;
  font-size: var(--ddd-font-size-l, 1rem);
  color: var(--ddd-theme-primary, #003366);
  border-bottom: var(--ddd-border-xs, 1px solid #ddd);
  padding-bottom: var(--ddd-spacing-2, 8px);
}

.sidebar label {
  display: flex;
  align-items: center;
  gap: var(--ddd-spacing-2, 8px);
  font-size: var(--ddd-font-size-m, 0.9rem);
}


      .search-bar input {
        width: 100%;
        padding: var(--ddd-spacing-3, 10px);
        border: var(--ddd-border-xs, 1px solid #ccc);
        border-radius: var(--ddd-radius-sm, 4px);
        font-size: var(--ddd-font-size-m, 1rem);
      }
  
      .filters {
        display: flex;
        flex-wrap: wrap;
        gap: var(--ddd-spacing-3, 10px);
        margin-bottom: var(--ddd-spacing-5, 20px);
      }

      .filters button {
        padding: var(--ddd-spacing-2, 8px) var(--ddd-spacing-4, 15px);
        border: none;
        border-radius: var(--ddd-radius-sm, 4px);
        background-color: var(--ddd-theme-default-muted, #e6e6e6);
        color: var(--ddd-theme-default-text, #333);
        cursor: pointer;
        transition: background-color 0.3s ease;
      }
  
      .filters button.active {
        background-color: var(--ddd-theme-primary, #003366);
        color: var(--ddd-theme-default-white, white);
      }

      .filters button:hover {
        background-color: var(--ddd-theme-default-hover, #d9d9d9);
      }
  
      .content-wrapper {
        display: flex;
        flex-direction: column;
        gap: var(--ddd-spacing-4, 15px);
      }

      .cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: var(--ddd-spacing-5, 20px);
        flex: 1;
      }

      .result-info {
        text-align: right;
        font-size: var(--ddd-font-size-m, 1rem);
        color: var(--ddd-theme-default-muted, #666);
      }
  
      .result-info {
        text-align: right;
        font-size: var(--ddd-font-size-m, 1rem);
        margin-bottom: var(--ddd-spacing-4, 15px);
        color: var(--ddd-theme-default-muted, #666);
      }
      
    `;
  }
  

  continue() {
    alert(`Selected Use Case: ${this.activeUseCase}`);
  }

  
  render() {
    return html`
      <div class="main-container">
       
        <div class="sidebar">
          <h3>Template</h3>
          ${[...new Set(this.useCaseData.flatMap((item) => item.tags))].map(
            (tag) => html`
              <label>
                <input 
                  type="checkbox" 
                  @change="${() => this.toggleFilter(tag)}" 
                  ?checked="${this.activeFilters.includes(tag)}" />
                ${tag}
              </label>
            `
          )}
          <button @click="${this.resetFilter}">Reset Filters</button>
        </div>
  
       
        <div class="content-wrapper">
          <div class="result-info">${this.filteredData.length} results</div>
          <div class="cards">
            ${this.filteredData.map(
              (item) => html`
                <dashboard-card
                  .name="${item.name}"
                  .description="${item.description}"
                  .image="${item.image}"
                  ?isSelected="${this.activeUseCase === item.name}"
                  @card-selected="${() => this.selectUseCase(item.name)}"
                ></dashboard-card>
              `
            )}
          </div>
        </div>

        <div class="continue-wrapper">
      <button @click="${this.continue}" ?disabled="${!this.activeUseCase}">
        Continue
      </button>
    </div>

      </div>
    `;
  }

  



 /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }

}

customElements.define("dashboard-comp", DashboardComp);

 
 

