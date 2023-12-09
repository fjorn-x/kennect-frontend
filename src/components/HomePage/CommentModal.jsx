import {useFormik} from "formik";
import React from "react";
import {IconButton, Button, styled, TextField, Modal, Box} from "@mui/material";
import * as yup from "yup";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";
import {useDispatch} from "react-redux";
import {replyPost} from "../../State/Posts/PostSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  border: "none",
  borderRadius: "16px",
  padding: "16px 8px",
  outline: "none",
};
const NoBorderTextField = styled(TextField)({
  ".css-8ewcdo-MuiInputBase-root-MuiOutlinedInput-root": {
    padding: "0px 0px 16.5px 0px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    padding: "0px 14px",
    border: "none",
  },
  "& .Mui-focused": {
    "& .MuiOutlinedInput-notchedOutline": {
      borderRadius: 0,
      borderBottom: "none",
    },
  },
});

const CommentModal = ({item}) => {
  const validationSchema = yup.object().shape({
    content: yup.string(),
  });

  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = (values, actions) => {
    values.id = item._id;
    console.log(values);
    dispatch(replyPost(values));
    actions.resetForm();
    handleClose();
  };
  const formik = useFormik({
    initialValues: {
      content: "",
    },
    onSubmit: handleSubmit,
    validationSchema,
  });
  return (
    <div>
      <IconButton onClick={handleOpen}>
        <ChatBubbleOutlineOutlinedIcon className="cursor-pointer hover:text-pink-600" fontSize="small" />
      </IconButton>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <IconButton onClick={handleClose} aria-label="delete" size="small">
            <CloseIcon />
          </IconButton>
          <div className="flex space-x-5 px-1 my-4">
            <div className="w-full ">
              <div className="flex justify-between items-start">
                <div className="flex space-x-1">
                  <span className="font-bold ">{item?.user?.name}</span>
                </div>
              </div>
              <div>
                <p className="p-0 w-full">{item?.content}</p>

                <p className="mb-3 mt-5 text-gray-400">Replying to {item?.user?.name}</p>
              </div>
            </div>
          </div>
          <div className="flex space-x-5 px-1 ">
            <div className="w-full">
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <NoBorderTextField
                    id="content"
                    name="content"
                    fullWidth
                    inputProps={{
                      style: {
                        padding: 0,
                      },
                    }}
                    placeholder="Comment"
                    value={formik.values.content}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.content && Boolean(formik.errors.content)}
                    helperText={formik.touched.content && formik.errors.content}
                    multiline
                    minRows={1}
                    maxRows={5}
                  />
                </div>

                <div className="flex justify-between items-center mt-5">
                  <div>
                    <Button
                      sx={{
                        width: "100%",
                        borderRadius: "20px",
                        py: "8px",
                        px: "20px",
                        bgcolor: "#9d174d",
                        "&:hover": {
                          backgroundColor: "black",
                        },
                      }}
                      className="hover:bg-black"
                      variant="contained"
                      type="submit"
                    >
                      Comment
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CommentModal;
