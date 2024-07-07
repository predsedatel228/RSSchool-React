import { Component } from 'react';

interface StatsI {
  name: string;
  value: number;
}

class Stats extends Component {
  props: StatsI;
  constructor(props: StatsI) {
    super(props);
    this.props = props;
  }

  render() {
    const {name, value} = this.props;
    return <div className="stats">
      <span>{name}</span>
      <span>{value}</span>
    </div>
  }
}

export default Stats;
