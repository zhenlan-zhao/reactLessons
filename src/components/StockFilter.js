import React from 'react'

class ProducCategory extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan='2'>
          {category}
        </th>
      </tr>
    )
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ? product.name : 
      <span style={{ color: 'red' }}>{product.name}</span>;
    return(
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const inStcokOnly = this.props.inStcokOnly;

    const rows = [];
    let lastCategory = null;

    this.props.products.forEach((product) => {
      if (product.name.indexOf(filterText) === -1) {
        return;
      }
      if (inStcokOnly && !product.stcoked) {
        return;
      }
      
      if (product.category !== lastCategory) {
        rows.push(
          <ProducCategory category={product.category} key={product.category} />
        );
      }
      rows.push(
        <ProductRow product={product} key={product.name}/>
      );
      lastCategory = product.category;
    });
    return (
      <table style={{margin: 'auto'}}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  handleFilterTextChange = (e) => {
    this.props.onFilterTextChange(e.target.value);
  }
  handleInStcokChange = (e) => {
    this.props.onInStockChange(e.target.checked);
  }
  
  render() {
    return (
      <form>
        <input type="text" placeholder="Search..."
          value={this.props.filterText} onChange={this.handleFilterTextChange} />
        <p>
          <input type="checkbox" 
            checked={this.props.inStcokOnly} onChange={this.handleInStcokChange} />
          {' '}
          Only Show Products in Stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
       filterText: '',
       inStcokOnly: false
    }
  }
  handleFilterTextChange = (filterText) => {
    this.setState({
      filterText: filterText
    })
  }
  handleInStcokChange = (inStcokOnly) => {
    this.setState({
      inStcokOnly: inStcokOnly
    })
  }
  render() {
    return (
      <div className='new-component'>
        <SearchBar 
          filterText={this.state.filterText} 
          inStcokOnly={this.state.inStcokOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onInStockChange={this.handleInStcokChange} />
        <ProductTable 
          products={this.props.products}
          filterText={this.state.filterText}
          inStcokOnly={this.state.inStcokOnly} />
      </div>
    );
  }
}

export default FilterableProductTable;