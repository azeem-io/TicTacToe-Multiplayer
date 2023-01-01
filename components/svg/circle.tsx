import { Icon, createIcon, IconProps } from "@chakra-ui/react";

const Circle = (props: IconProps) => (
   <>
      <Icon
         viewBox="0 0 520 520"
         {...props}
         //  position="absolute"
         //  zIndex={-10}
      >
         <path
            fill="#E7E502"
            d="M 233.5,-0.5 C 248.167,-0.5 262.833,-0.5 277.5,-0.5C 377.805,11.9821 449.305,63.9821 492,155.5C 502.297,180.687 508.797,206.687 511.5,233.5C 511.5,248.167 511.5,262.833 511.5,277.5C 499.018,377.805 447.018,449.305 355.5,492C 330.313,502.297 304.313,508.797 277.5,511.5C 262.833,511.5 248.167,511.5 233.5,511.5C 133.195,499.018 61.6947,447.018 19,355.5C 8.70332,330.313 2.20332,304.313 -0.5,277.5C -0.5,262.833 -0.5,248.167 -0.5,233.5C 11.9821,133.195 63.9821,61.6947 155.5,19C 180.687,8.70332 206.687,2.20332 233.5,-0.5 Z M 236.5,64.5 C 319.359,60.5027 381.859,93.836 424,164.5C 460.039,239.358 453.373,310.024 404,376.5C 347.95,439.064 279.117,459.564 197.5,438C 120.738,410.003 76.5708,355.503 65,274.5C 60.5171,191.616 93.6838,129.116 164.5,87C 187.264,75.1493 211.264,67.6493 236.5,64.5 Z"
         />
      </Icon>
   </>
);

export default Circle;