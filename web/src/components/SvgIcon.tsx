import { FC, ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

export type Icons = Record<string, ReactElement>;

const icons: Icons = {
  ADD: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 -960 960 960"
    >
      <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240z"></path>
    </svg>
  ),
  REMOVE: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 -960 960 960"
    >
      <path d="M200-440v-80h560v80H200z"></path>
    </svg>
  ),
  SUBMIT: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="24"
      viewBox="0 -960 960 960"
    >
      <path d="M200-440v-80h560v80H200z"></path>
    </svg>
  ),
};

// style props
interface StyleProps {
  iconWidth: string | number;
  iconHeight: string | number;
  iconFill: string;
}

const useStyles = createUseStyles<string, StyleProps>(() => ({
  icon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: (props) => props.iconWidth,
    height: (props) => props.iconHeight,

    // kiválasztjuk az svg-t a child elementek közül
    '& > svg': (props) => ({
      fill: props.iconFill,
    }),
  },
}));

// komponens props-ok,
// name: az Icons type kulcsai, Record<string, ReactElement> ugyan az mint { [key: string]: ReactElement },
// ez annyit jelent, hogy aobject elemeit sztringel érheted el, és ReactElementet ad vissza, pl: Icons["Add"]
// width, height egyértelmű, fill a szín, ezek opcionálisak, default értéket kapnak ha nem adjuk meg
export interface SvgIconProps {
  iconName: keyof Icons;
  iconWidth?: string | number;
  iconHeight?: string | number;
  iconFill?: string;
}

// ikonok itt: https://fonts.google.com/icons
// átalakítani jsx-re: https://svg2jsx.com/
const SvgIcon: FC<SvgIconProps> = ({
  iconName,
  iconWidth = 30,
  iconHeight = 30,
  iconFill = 'white',
}) => {
  //itt átadjuk a width height fill-t a jss-nek
  const classes = useStyles({ iconWidth, iconHeight, iconFill });

  return <div className={classes.icon}>{icons[iconName]}</div>;
};

export default SvgIcon;
