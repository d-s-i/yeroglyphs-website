import * as React from 'react';
import ButtonUnstyled, {
  ButtonUnstyledProps,
  buttonUnstyledClasses,
} from '@mui/base/ButtonUnstyled';
import Typography from "@mui/material/Typography";
import { styled, Theme } from '@mui/system';

const ButtonRoot = React.forwardRef(function ButtonRoot(
  props: React.PropsWithChildren<{}>,
  ref: React.ForwardedRef<any>,
) {
  const { children, ...other } = props;

  return (
    <svg width="150" height="50" {...other} ref={ref}>
      <polygon points="10,45 10,5 140,5 140,45" className="bg" />
      <polygon points="10,45 10,5 140,5 140,45" className="borderEffect" />
      <foreignObject x="0" y="0" width="150" height="50">
        <div className="content">{children}</div>
      </foreignObject>
    </svg>
  );
});

const CustomButtonRoot = styled(ButtonRoot)(
  ({ theme }: { theme: Theme }) => `
  overflow: visible;
  cursor: pointer;
  --main-color: ${
    theme.palette.mode === 'light' ? '#FFD700' : '#FFD700'
  };
  --hover-color: ${
    theme.palette.mode === 'light'
      ? 'rgba(255,215,0,0.04)'
      : 'rgba(255,215,0,0.08)'
  };
  --active-color: ${
    theme.palette.mode === 'light'
      ? 'rgba(255,215,0,0.12)'
      : 'rgba(255,215,0,0.24)'
  };

  & polygon {
    fill: transparent;
    transition: all 800ms ease;
    pointer-events: none;
  }
  
  & .bg {
    stroke: var(--main-color);
    stroke-width: 0.5;
    filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.1));
    fill: transparent;
  }

  & .borderEffect {
    stroke: var(--main-color);
    stroke-width: 2;
    stroke-dasharray: 150 600;
    stroke-dashoffset: 150;
    fill: transparent;
  }

  &:hover,
  &.${buttonUnstyledClasses.focusVisible} {
    .borderEffect {
      stroke-dashoffset: -600;
    }

    .bg {
      fill: var(--hover-color);
    }
  }

  &:focus,
  &.${buttonUnstyledClasses.focusVisible} {
    outline: none;
  }

  &.${buttonUnstyledClasses.active} { 
    & .bg {
      fill: var(--active-color);
      transition: fill 300ms ease-out;
    }
  }

  & foreignObject {
    pointer-events: none;

    & .content {
      font-family: Helvetica, Inter, Arial, sans-serif;
      font-size: 14px;
      font-weight: 200;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--main-color);
      text-transform: uppercase;
    }

    & svg {
      margin: 0 5px;
    }
  }`,
);

const SvgButton = React.forwardRef(function SvgButton(
  props: ButtonUnstyledProps,
  ref: React.ForwardedRef<any>,
) {
  return <ButtonUnstyled {...props} component={CustomButtonRoot} ref={ref} />;
});

interface Props {
    children: React.ReactNode;
    onClick: () => void
}

export default function MySVGButton(props: Props) {
  return (
    <SvgButton onClick={props.onClick}>
      <Typography component="p" sx={{ fontSize: "1.1em", textTransform: "none" }} >{props.children}</Typography>
    </SvgButton>
  );
}