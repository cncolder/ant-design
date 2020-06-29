import * as React from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Avatar from './avatar';

export interface GroupProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  prefixCls?: string;
  hovered?: boolean;
  maxLength?: number;
  excessItemsStyle?: React.CSSProperties;
}

const Group: React.FC<GroupProps> = props => (
  <ConfigConsumer>
    {({ getPrefixCls, direction }: ConfigConsumerProps) => {
      const {
        prefixCls: customizePrefixCls,
        className = '',
        hovered,
        maxLength,
        excessItemsStyle,
      } = props;
      const prefixCls = getPrefixCls('avatar-group', customizePrefixCls);
      const cls = classNames(
        prefixCls,
        {
          [`${prefixCls}-rtl`]: direction === 'rtl',
          [`${prefixCls}-hovered`]: hovered,
        },
        className,
      );

      const renderChildren = () => {
        const { children } = props;
        const numOfChildren = React.Children.count(children);
        if (maxLength && maxLength < numOfChildren) {
          const childrenWithProps = React.Children.toArray(children).slice(0, maxLength);
          childrenWithProps.push(
            <Avatar style={excessItemsStyle}>{`+${numOfChildren - maxLength}`}</Avatar>,
          );
          return childrenWithProps;
        }
        return props.children;
      };

      return (
        <div className={cls} style={props.style}>
          {renderChildren()}
        </div>
      );
    }}
  </ConfigConsumer>
);

export default Group;
