import React, { Component } from "react";

export function ophydSubscription(WrappedComponent) {
  return class extends Component {
    componentDidMount() {
      this.props.subscribeOphyd(this.props.device);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}
