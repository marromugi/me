import { MarkdownListItemProps } from './type';

export const MarkdownListItem = ({
  //node,
  children,
}: MarkdownListItemProps) => {
  return (
    <li className="marker:text-gray-500 [&>*]:my-2" style={{}}>
      {children}
    </li>
  );
};
