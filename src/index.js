import React from 'react';
import ReactDom from 'react-dom';
import './index.css'

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    //bind
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(e) {
    this.props.onSelect()
  }
  render() {
    return (
      <form>
        <input type='text' placeholder="Search..."/>
        <p>
          <input type='checkbox' onClick={this.handleSelect}/>
          {' '} Only show products in stock 
          </p>
      </form>
    )
  }
}

class ProductCategoryRow extends React.Component {
  render() {
    return (
      <tr>
        <th colSpan="2">{this.props.category}</th>
      </tr>
    )
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ? product.name : 
      <span style={{color: 'red'}}> {product.name} </span>

    return(
      <tr>
        <td>{name} </td>
        <td>{product.price}</td>
      </tr>
    )
  }
}

class ProductTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    //build rows
    const products = this.props.products;
    const inStockOnly = this.props.inStockOnly;
    console.log('isStockOnly', inStockOnly);

    let rows = [], lastCategory = null;
    products.forEach(function(product) {
      if (lastCategory !== product.category) {
        lastCategory = product.category;
        
        rows.push(
          <ProductCategoryRow 
            category={product.category} 
            key={product.category}
          />
        )
      }
      
      if (this.props.inStockOnly && !product.stocked)
        return;

      rows.push(
        <ProductRow product={product}/>
      )
    }, this); 

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    )
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inStockOnly: false
    }

    //bind
    this.handleSearchBar = this.handleSearchBar.bind(this);
  }

  handleSearchBar() {
    this.setState(prevState => ({
      inStockOnly: !prevState.inStockOnly
    }))

    console.log('search bar change', this.state.inStockOnly);
  }

  render() {
    return(
      <div>
        <SearchBar onSelect={this.handleSearchBar}/>
        <ProductTable products={this.props.products} inStockOnly={this.state.inStockOnly}/>
      </div>
    )
  }
}

const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDom.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('root')
)