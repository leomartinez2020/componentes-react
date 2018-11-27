import React, { Component } from 'react';
import '../Almacen.css';

const products = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

class SearchBar extends Component {
  constructor(props) {
    super(props);
    //this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleInStockChange(e) {
    let valor = e.target.checked;
    this.props.onInStockChange(valor)
  }

  render() {
    let inStockOnly = this.props.inStockOnly;
    return (
      <div className="searchbar">
        <div className="search-input">
          <input placeholder="Search..."/>
          <p>{inStockOnly.toString()}</p>
        </div>
        <p>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={this.handleInStockChange}
          />
          Only show products in stock
        </p>
      </div>
    )
  }
}

function ProductTable(props) {
  let filterText = props.filterText;
  let inStockOnly = props.inStockOnly;
  return (
    <div className="product-table">
      <div className="name-price">
        <p>Name</p>
        <p>Price</p>
      </div>
      <div>
        <ProductCategoryRow inStockOnly={inStockOnly} category="Sporting Goods"/>
        <ProductCategoryRow inStockOnly={inStockOnly} category="Electronics" />
      </div>
    </div>
  )
}

function ProductRow(props) {
  let filtrados = products.filter((item) => item.category === props.category)
  filtrados = props.inStockOnly ? filtrados.filter((item) => item.stocked) : filtrados;
  return (
    <div className="product-row">
      {
        filtrados.map((item, key) =>
          <p key={key} className={item.stocked ? '' : 'color-rojo'}>{item.name} {item.price}</p>
        )
      }
    </div>
  )
}

function ProductCategoryRow(props) {
  let inStockOnly = props.inStockOnly;
  return (
    <div className="product-category-row">
      <p className="product-category-header">{props.category}</p>
      <ProductRow inStockOnly={inStockOnly} category={props.category} />
    </div>
  )
}

class FilterableProductTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false
    }
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleInStockChange(inStockOnly) {
    this.setState({
      inStockOnly: inStockOnly
    })
  }

  render() {
    return (
      <div className="filterable-product-table">
        <SearchBar
          onInStockChange={this.handleInStockChange}
          inStockOnly={this.state.inStockOnly}
          filterText={this.state.filterText}
        />
        <ProductTable
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    )
  }
}

export default FilterableProductTable;
