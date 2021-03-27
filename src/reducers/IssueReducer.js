import * as Types from "../actions/ActionTypes";

const initialSate = {
  loading: true,
  issues: [],
  filters: { status: "All", severity: "All", description: "" },
  visibilityFilter: ["Severity", "Created Date", "Status", "Resolved Date"]
};

const IssueReducer = (state = initialSate, action) => {
  switch (action.type) {
    case Types.FILTER_BY_STATUS: {
      const value = action.payload;
      const filtered =
        value !== "All"
          ? state.issues.filter((issue) => issue.status == action.payload)
          : [...state.issues];
      return {
        ...state,
        issues: [...filtered],
        filters: { ...state.filters, status: value }
      };
    }
    case Types.FILTER_BY_SEVERITY: {
      const value = action.payload;
      const filtered =
        value !== "All"
          ? state.issues.filter((issue) => issue.severity == action.payload)
          : [...state.issues];
      return {
        ...state,
        issues: [...filtered],
        filters: { ...state.filters, severity: value }
      };
    }
    case Types.FILTER_BY_DESCRIPTION: {
      const value = action.payload;
      const filtered = value
        ? state.issues.filter((issue) =>
            issue.description.toLowerCase().includes(value.toLowerCase())
          )
        : [...state.issues];
      console.log("Inside Filter...");
      console.log(filtered);
      return {
        ...state,
        issues: [...filtered],
        filters: { ...state.filters, description: value }
      };
    }
    case Types.SET_VISIBLE_FILTER: {
      const filters = action.payload;
      if (filters.length > 0) {
        return {
          ...state,
          issues: [...state.issues],
          filters: { ...state.filters },
          visibilityFilter: [...action.payload]
        };
      } else {
        return {
          ...state,
          issues: [...state.issues],
          filters: { ...state.filters },
          visibilityFilter: []
        };
      }
    }
    case Types.ADD_ISSUE: {
      return { ...state, issues: [...state.issues, action.payload] };
    }
    case Types.DELETE_ISSUE: {
      const newState = state.issues.filter(
        (issue) => issue.id != action.payload
      );
      return { ...state, issues: [...newState] };
    }
    case Types.UPDATE_ISSUE: {
      return { ...state, issues: [...state.issues, action.payload.issues] };
    }
    case Types.LOAD_ISSUES: {
      return { ...state, loading: true };
    }
    case Types.LOAD_ISSUES_SUCCESS: {
      return { ...state, issues: action.payload, loading: false };
    }
    default:
      return state;
  }
};
export default IssueReducer;
