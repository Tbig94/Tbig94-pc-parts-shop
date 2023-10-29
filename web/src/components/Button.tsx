import { FC } from 'react';
import { createUseStyles } from 'react-jss';
import SvgIcon, { Icons, SvgIconProps } from './SvgIcon.tsx';

interface StyleProps {
  width: string | number;
  height: string | number;
  radiusLeft: boolean;
  radiusRight: boolean;
}

const useStyles = createUseStyles<string, StyleProps>(() => ({
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#3b3b3b',
    backgroundColor: '#6cfa25',
    '&:hover': {
      color: '#ffffff',
      backgroundColor: '#369c03',
      transitionDuration: '200ms',
    },
    '&:active': {
      color: '#3b3b3b',
      backgroundColor: '#6cfa25',
      transitionDuration: '200ms',
    },
    fontSize: 16,
    fontWeight: 650,
    padding: 0,
    margin: 0,
    outline: 'none',
    cursor: 'pointer',
    minWidth: (props) => props.width,
    minHeight: (props) => props.height,
    border: '2px solid black',
    borderTopLeftRadius: (props) => (props.radiusLeft ? 10 : 0),
    borderBottomLeftRadius: (props) => (props.radiusLeft ? 10 : 0),
    borderTopRightRadius: (props) => (props.radiusRight ? 10 : 0),
    borderBottomRightRadius: (props) => (props.radiusRight ? 10 : 0),
  },
}));

// extendáljuk az iconok propsaival, szóval ha meghívjuk a <Button -t akkor az svg iconnak is tudunk adni propsot
interface Props extends SvgIconProps {
  name: string;
  text: string;
  onClick: () => void;
  width?: string | number;
  height?: string | number;
  radiusLeft?: boolean;
  radiusRight?: boolean;
}
const Button: FC<Props> = ({
  name,
  text,
  onClick,
  width = 30,
  height = 30,
  radiusLeft = false,
  radiusRight = false,
  iconName,
  iconWidth,
  iconHeight,
  iconFill,
}) => {
  const classes = useStyles({ width, height, radiusLeft, radiusRight });

  return (
    <button
      className={classes.button}
      name={name}
      type="button"
      onClick={onClick}
    >
      {iconName ? (
        <SvgIcon
          iconName={iconName}
          iconWidth={iconWidth}
          iconHeight={iconHeight}
          iconFill={iconFill}
        />
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
