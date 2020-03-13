import React from 'react';
import styled from 'styled-components';
import Icon from '../../content/Icon/Icon';
import Spacing from '../../layout/Spacing/Spacing';

export const Header = styled.div`
  width: auto;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 16px;
  font-weight: 900;
  color: #000;
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: flex-start;

  & > img {
    margin-right: 15px;
  }
`;

const DropdownMenu = styled.div`
  background-color: #fff;
  padding: 20px 0;
  white-space: nowrap;
  position: absolute;
  top: calc(100% + 15px);
  right: 0;
  z-index: 9;
  overflow-y: auto;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.45), 0 2px 2px rgba(0, 0, 0, 0.45);
  max-height: calc(100vh - 30px - 40px);
  min-width: calc(100% + 15px);
`;

const DropdownMenuArrow = styled.div`
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 8px solid #fff;
  position: absolute;
  bottom: -15px;
  right: 3px;
`;

const DropdownComponent = styled.div`
  position: relative;
  display: flex;
  width: ${props => (props.width ? `${props.width}px` : 'auto')};

  & button {
    cursor: pointer;
    color: ${props => (props.inverted ? '#000000' : '#FFFFFF')};
    font-family: 'Nunito Sans', sans-serif;
    font-size: 13px;
    font-weight: 800;
    text-transform: uppercase;
    background: none;
    border: none;
    width: inherit;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:active,
    &:focus {
      border: none;
      outline: none;
    }
  }

  & button span {
    margin: 0 10px 0 0;
    line-height: 1.15;
    letter-spacing: 0.5px;
  }
`;

const DropdownTriggerButton = styled.button.attrs(() => ({ type: 'button' }))`
  height: 100%;
`;

interface Props {
  children?: any;
  label: string | Function;
  icon?: string;
  width?: string;
  disabled?: boolean;
  inverted?: boolean;
}

interface ChildrenProps {
  closeMenu?: Function;
}

interface State {
  show?: boolean;
}

class Dropdown extends React.Component<Props, State> {
  static defaultProps = {
    inverted: false,
  };

  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  toggleMenu() {
    this.setState({ show: !this.state.show });
  }

  closeMenu() {
    this.setState({ show: false });
  }

  render() {
    const { children, label, icon, width, disabled, inverted } = this.props;
    const show = this.state.show && !disabled;
    const colorStrategy = inverted ? '#000000' : '#FFFFFF';

    return (
      <DropdownComponent width={width} inverted={inverted}>
        <React.Fragment>
          {icon && (
            <Spacing margin={{ right: 17, top: -2 }}>
              <Icon name={icon} size={16} color={colorStrategy} />
            </Spacing>
          )}
          <DropdownTriggerButton onClick={this.toggleMenu.bind(this)}>
            {typeof label === 'string' ? <span>{label}</span> : label()}
            {show ? (
              <Icon name="angle-right" color={colorStrategy} />
            ) : (
              <Icon name="angle-down" color={colorStrategy} />
            )}
          </DropdownTriggerButton>
        </React.Fragment>
        {show && (
          <React.Fragment>
            <DropdownMenu>
              {React.Children.map(children, child =>
                React.cloneElement<ChildrenProps>(child, {
                  closeMenu: this.closeMenu.bind(this),
                })
              )}
            </DropdownMenu>
            <DropdownMenuArrow />
          </React.Fragment>
        )}
      </DropdownComponent>
    );
  }
}

/** @component */
export default Dropdown;
