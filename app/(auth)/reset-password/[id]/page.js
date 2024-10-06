import ResetPasswordForm from "@/components/ui/ResetPasswordForm";

function ResetPassword({ params }) {
  console.log(params, 'TOKEN here')
  return <ResetPasswordForm token={ params?.id} />;
}

export default ResetPassword;
