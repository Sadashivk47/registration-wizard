export default function ReviewSubmitStep({ data }) {
  return (
    <div className="form-section">
      <div className="review-card">
        <h3>Personal Information</h3>

        <div className="review-row">
          <span>First Name</span>
          <strong>{data.firstName}</strong>
        </div>

        <div className="review-row">
          <span>Last Name</span>
          <strong>{data.lastName}</strong>
        </div>

        <div className="review-row">
          <span>Date of Birth</span>
          <strong>{data.dob}</strong>
        </div>
      </div>

      <div className="review-card">
        <h3>Account Details</h3>

        <div className="review-row">
          <span>Email</span>
          <strong>{data.email}</strong>
        </div>

        <div className="review-row">
          <span>Password</span>
          <strong>••••••••</strong>
        </div>
      </div>
    </div>
  );
}