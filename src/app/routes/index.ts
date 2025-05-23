import express from "express";
import { UserRoutes } from "../modules/users/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { ReviewRoutes } from "../modules/reviews/review.route";
import { EventRoutes } from "../modules/events/event.routes";
import { ParticipantRoutes } from "../modules/participant/participant.route";
import { InvitationRoutes } from "../modules/invitations/invitation.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/reviews",
    route: ReviewRoutes,
  },
  {
    path: "/events",
    route: EventRoutes,
  },
  {
    path: "/participants",
    route: ParticipantRoutes,
  },
  {
    path: "/invitations",
    route: InvitationRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
