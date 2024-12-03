import { Badge, BadgeProps } from "../../ui/badge";

interface PropsTag extends BadgeProps {
  value: boolean;
}
export const ActiveTagCell: React.FC<PropsTag> = ({ value, ...props }) => {
  return !value ? (
    <Badge variant={"outline"} {...props}>
      Đang sử dụng
    </Badge>
  ) : (
    <Badge variant={"destructive"} {...props}>
      Ngưng sử dụng
    </Badge>
  );
};
