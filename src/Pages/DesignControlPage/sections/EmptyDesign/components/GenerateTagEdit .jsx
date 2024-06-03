import { Fragment, useMemo } from "react";
import PropTypes from "prop-types";
import { styled, useTheme } from "@mui/system";
import exampleImage from "../../../../../assets/images/exampleimage.jpg"; // Örnek resim yolu
import { Link, NavLink } from "react-router-dom";
import config from "../../../../../../Config.json"; // Uygulamanızdaki yapılandırma dosyasının doğru yolunu sağlayın

const designImagesFolderName = "ImagesInsideDesigns";
const repeat = (selectedElement) => {
  return selectedElement.children && selectedElement.children.length > 0
    ? selectedElement.children.map((child, key) => (
        <Fragment key={key}>
          <GenerateTagEdit
            key={child.id}
            // elementStyle={elementStyle}
            selectedTemplate={child}
          />
        </Fragment>
      ))
    : null;
};

export const GenerateTagEdit = ({ selectedTemplate, elementStyle }) => {
  const theme = useTheme();
  const sortedData = Array.isArray(selectedTemplate)
    ? selectedTemplate.sort((a, b) => a.sequence_number - b.sequence_number)
    : selectedTemplate;

  const type = sortedData?.element_type?.element_type_name || "";
  const content = sortedData?.element_content || "";
  const key = sortedData?.id || "";
  const hasChildren = sortedData?.children?.length > 0;
  const exampleText = hasChildren ? repeat(sortedData, GenerateTagEdit) : content;

  const defaultProps = useMemo(() => ({
    type,
    key,
    placeholder: type,
  }), [key, type]);

  return (
    <Tag
      type={type}
      defaultProps={defaultProps}
      exampleText={exampleText}
      sortedData={sortedData}
      elementStyle={elementStyle}
    />
  );
};

GenerateTagEdit.propTypes = {
  selectedTemplate: PropTypes.any,
  elementStyle: PropTypes.object
};

const Tag = ({ type, defaultProps, exampleText, sortedData, elementStyle }) => {

  const component = useMemo(() => {
    switch (type.toLowerCase()) {
      case "text field strings":
      case "text field numbers":
      case "text field files":
        return "input";
      case "paragraph":
        return "p";
      case "heading 1":
        return "h1";
      case "heading 2":
        return "h2";
      case "heading 3":
        return "h3";
      case "heading 4":
        return "h4";
      case "heading 5":
        return "h5";
      case "heading 6":
        return "h6";
      case "subtitle 1":
      case "subtitle 2":
      case "body 1":
      case "body 2":
        return "p";
      case "normal link":
        return Link;
      case "lazy link":
        return NavLink;
      case "ordered list item":
      case "unordered list item":
        return "li";
      case "unordered list":
        return "ul";
      case "ordered list":
        return "ol";
      case "table caption":
        return "caption";
      case "table head":
        return "thead";
      case "table body":
        return "tbody";
      case "table foot":
        return "tfoot";
      case "table head row":
      case "table body row":
      case "table foot row":
        return "tr";
      case "table":
        return "table";
      case "table head cell":
      case "table body cell":
      case "table foot cell":
        return "td";
      case "text area":
        return "textarea";
      case "select input option":
        return "option";
      case "select input":
        return "select";
      case "button":
        return "button";
      case "image":
        return "img";
      case "audio":
        return "audio";
      case "video":
        return "video";
      case "iframe":
        return "iframe";
      case "form":
        return "form";
      case "bold text":
        return "b";
      case "canvas":
        return "canvas";
      case "label":
        return "label";
      case "strong text":
        return "strong";
      case "code":
        return "code";
      case "component":
      case "section":
        return "div";
      default:
        return null;
    }
  }, [type]);

  const initialStyles = useMemo(() => ({
    width: type.toLowerCase() === "image" ? "100%" : undefined,
    height: type.toLowerCase() === "image" ? "100%" : undefined,
  }), [type]);

  const StyledComp = useMemo(() => styled(component)(({ theme }) => ({
    ...initialStyles,
    ...elementStyle,
  })), [component, elementStyle, initialStyles]);

  const getImageSrc = useMemo(() => {
    if (sortedData.element_type.element_type_name === "Image") {
      if (exampleText === "Blank Image") {
        return exampleImage;
      } else if (exampleText.startsWith("data:")) {
        return exampleText;
      } else {
        return `${config.ServerImageRoute}/${designImagesFolderName}/${exampleText}`;
      }
    }
    return null;
  }, [exampleText, sortedData.element_type.element_type_name]);

  return !sortedData.element_type.not_has_end_tag ? (
    <StyledComp {...defaultProps} src={getImageSrc}>
      {exampleText}
    </StyledComp>
  ) : (
    <StyledComp {...defaultProps} src={getImageSrc} placeholder={exampleText} />
  );
};

Tag.propTypes = {
  type: PropTypes.string,
  defaultProps: PropTypes.object,
  exampleText: PropTypes.any,
  sortedData: PropTypes.any,
  elementStyle: PropTypes.object,
};

export { Tag };
